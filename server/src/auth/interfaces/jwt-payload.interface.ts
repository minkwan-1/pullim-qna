export interface JwtPayload {
  email?: string;
  phoneNumber?: string;
  sub: number; // 사용자 ID
  iat?: number; // 발행 시간
  exp?: number; // 만료 시간
}
