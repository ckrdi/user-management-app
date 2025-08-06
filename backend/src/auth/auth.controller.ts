import { Body, Controller, Get, Post, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

type LoginRequest = {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginRequest) {
    if (!req.email || !req.password) throw new BadRequestException("No email or password.");
    return await this.authService.login(req.email, req.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() req: Request & { user: any }) {
    return { user: req.user };
  }
}
