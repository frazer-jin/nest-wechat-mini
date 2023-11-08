import {
  Body,
  Controller,
  Get,
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
  async login(@Body() login: LoginDto) {
    const wxSession = (await this.authService.getWxSession(
      login.code,
    )) as WxSessionDto;
    if (!wxSession) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(login, wxSession);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
