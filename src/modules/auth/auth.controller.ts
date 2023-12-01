import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { WxSessionDto } from './dto/wx-session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() login: LoginDto,
    @Headers('X-WX-OPENID') openid: string,
    @Headers('X-WX-UNIONID') unionid: string,
  ) {
    // const wxSession = (await this.authService.getWxSession(
    //   login.code,
    // )) as WxSessionDto;
    // if (!wxSession) {
    //   return { message: 'Invalid credentials' };
    // }
    const wx_session = { open_id: openid, union_id: unionid } as WxSessionDto;
    return this.authService.login(login, wx_session);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
