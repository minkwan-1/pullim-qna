import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PhoneVerificationDto } from './dto/phone-verification.dto';
import { PhoneVerifyDto } from './dto/phone-verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Google OAuth 리다이렉트 처리
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const result = await this.authService.googleLogin(req.user);

    // 클라이언트 측으로 리다이렉트 (토큰 포함)
    return res.redirect(
      `${process.env.GOOGLE_CALLBACK_URL}/auth/callback?token=${result.accessToken}`,
    );
  }

  @Post('phone/send-code')
  async sendVerificationCode(
    @Body() phoneVerificationDto: PhoneVerificationDto,
  ) {
    return this.authService.sendVerificationCode(
      phoneVerificationDto.phoneNumber,
    );
  }

  @Post('phone/verify')
  async verifyPhoneNumber(@Body() phoneVerifyDto: PhoneVerifyDto) {
    return this.authService.verifyPhoneNumber(
      phoneVerifyDto.phoneNumber,
      phoneVerifyDto.code,
    );
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}
