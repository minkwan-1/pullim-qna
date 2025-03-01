import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PhoneVerificationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: '국제 전화번호 형식으로 입력해주세요 (예: +821012345678)',
  })
  phoneNumber: string;
}
