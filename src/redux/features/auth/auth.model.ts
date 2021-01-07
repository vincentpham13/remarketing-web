export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  expires: string | null;
}

export interface IAuthRequest {
  username: string;
  password: string;
}
