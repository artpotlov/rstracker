export interface IUserData {
  userId: string;
  login: string;
  token: string;
}

export interface ITokenData {
  exp: number;
  iat: number;
  id: string;
  login: string;
  isExpired(): boolean;
}
