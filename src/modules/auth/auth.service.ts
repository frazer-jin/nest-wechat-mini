import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { WxSessionDto } from './dto/wx-session.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async getWxSession(code: string): Promise<any> {
    // 通过微信接口获取用户信息
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const params = {
      appid: this.configService.get<string>('WX_APPID'),
      secret: this.configService.get<string>('WX_SECRET'),
      js_code: code,
      grant_type: 'authorization_code',
    };
    const response = await this.httpService.get(url, { params }).toPromise();

    return { open_id: response.data.openid || 'a' };
  }

  async login(login: LoginDto, wxSession: WxSessionDto): Promise<any> {
    // 获取本地用户
    let user = await this.userService.findByOpenId(wxSession.open_id);

    // 如果没有，则创建一个用户
    if (null == user) {
      const newUser = new UserDto();

      Object.keys(login).forEach((key) => {
        newUser[key] = login[key];
      });
      Object.keys(wxSession).forEach((key) => {
        newUser[key] = wxSession[key];
      });

      user = await this.userService.insert(newUser);
    } else {
      // 更新一下用户信息
      const newUser = new UserDto();

      Object.keys(login).forEach((key) => {
        newUser[key] = login[key];
      });
      user = await this.userService.update(user, newUser);
    }

    // 把用户信息封装成jwt payload
    const payload = { username: user.nick_name, user_id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: user.id,
      user_name: user.nick_name,
      user_avatar: user.avatar_url,
    };
  }
}
