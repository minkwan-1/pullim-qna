import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET, // process.env로 가져오기
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES || '1d', // process.env로 가져오기
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    TwilioModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
