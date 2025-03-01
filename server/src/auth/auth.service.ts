import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { TwilioService } from '../twilio/twilio.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private twilioService: TwilioService,
  ) {}

  // 사용자 회원가입
  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password, phoneNumber } = createUserDto;

    // 이메일 중복 확인
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새 사용자 생성
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await this.usersRepository.save(user);

    // JWT 토큰 생성
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // 일반 로그인
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Google OAuth 로그인
  async googleLogin(googleUser: any): Promise<{ accessToken: string }> {
    const { email, firstName, lastName } = googleUser;

    let user = await this.usersRepository.findOne({ where: { email } });

    // 사용자가 없으면 생성
    if (!user) {
      user = this.usersRepository.create({
        email,
        firstName,
        lastName,
        isGoogleAccount: true,
      });
      await this.usersRepository.save(user);
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // 전화번호 인증코드 발송
  async sendVerificationCode(
    phoneNumber: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.twilioService.sendVerificationCode(phoneNumber);
      return { success: true, message: '인증코드가 발송되었습니다.' };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('인증코드 발송에 실패했습니다.');
    }
  }

  // 전화번호 인증코드 확인
  async verifyPhoneNumber(
    phoneNumber: string,
    code: string,
  ): Promise<{ accessToken: string }> {
    const isVerified = await this.twilioService.verifyCode(phoneNumber, code);

    if (!isVerified) {
      throw new UnauthorizedException('유효하지 않은 인증코드입니다.');
    }

    // 해당 전화번호로 사용자 찾기
    let user = await this.usersRepository.findOne({ where: { phoneNumber } });

    // 사용자가 없으면 새로 생성
    if (!user) {
      user = this.usersRepository.create({
        phoneNumber,
        isPhoneVerified: true,
      });
      await this.usersRepository.save(user);
    } else {
      // 사용자가 있으면 전화번호 인증 상태 업데이트
      user.isPhoneVerified = true;
      await this.usersRepository.save(user);
    }

    const payload: JwtPayload = { phoneNumber: user.phoneNumber, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // JWT 토큰으로 사용자 검증
  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    const { email, sub } = payload;
    const user = await this.usersRepository.findOne({
      where: { id: sub, email },
    });

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return user;
  }
}
