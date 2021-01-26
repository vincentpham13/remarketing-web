export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  user?: {
    id: string;
    name: string;
    roleId: number;
  },
  expires: string | null;
}

export interface IAuthAccountRequest {
  email: string;
  password: string;
}
export interface IAuthFBAccountRequest {
  fbUserId: string;
  accessToken: string;
}
