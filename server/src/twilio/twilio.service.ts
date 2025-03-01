import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;
  private verifyServiceSid: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID; // process.env로 가져오기
    const authToken = process.env.TWILIO_AUTH_TOKEN; // process.env로 가져오기
    this.verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID; // process.env로 가져오기

    this.client = twilio(accountSid, authToken);
  }

  // 인증 코드 전송
  async sendVerificationCode(phoneNumber: string): Promise<boolean> {
    try {
      const verification = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      return verification.status === 'pending';
    } catch (error) {
      console.error('Twilio verification error:', error);
      return false;
    }
  }

  // 인증 코드 확인
  async verifyCode(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const verificationCheck = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verificationChecks.create({ to: phoneNumber, code });

      return verificationCheck.status === 'approved';
    } catch (error) {
      console.error('Twilio verification check error:', error);
      return false;
    }
  }
}
