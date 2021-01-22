export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  expires: string | null;
}

export interface IAuthRequest {
  email: string;
  password: string;
}
