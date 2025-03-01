import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';

export class PhoneVerifyDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: '국제 전화번호 형식으로 입력해주세요 (예: +821012345678)',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 6, { message: '인증코드는 4-6자리 숫자입니다' })
  code: string;
}
