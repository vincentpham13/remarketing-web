export interface IUserState {
  id: string,
  name: string;
  email: string;
  phone?: string;
  job?: string;
  remainingMessages?: number;
  totalMessages?: number;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  job: string;
}
