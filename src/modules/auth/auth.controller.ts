import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.getWxUser(req.body.code);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
