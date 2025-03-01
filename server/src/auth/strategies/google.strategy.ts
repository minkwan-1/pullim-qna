import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as dotenv from 'dotenv'; // dotenv 패키지 추가

dotenv.config(); // .env 파일 로드

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // 환경 변수 사용
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // 환경 변수 사용
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // 환경 변수 사용
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
