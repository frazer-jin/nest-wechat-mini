import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWxUser(code: string): Promise<any> {
    // 通过微信接口获取用户信息
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const params = {
      appid: this.configService.get<string>('WX_APPID'),
      secret: this.configService.get<string>('WX_SECRET'),
      js_code: code,
      grant_type: 'authorization_code',
    };
    const response = await this.httpService.get(url, { params }).toPromise();

    return { openid: response.data.openid };
  }

  async login(user: any): Promise<any> {
    // 获取本地用户
    // 如果没有，则创建一个用户

    // 把用户信息封装成jwt payload
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
