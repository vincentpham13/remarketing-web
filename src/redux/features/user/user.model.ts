export interface IUserState {
  id: string,
  picture: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  city?: string;
  companyName?: string;
  successMessages: number;
  totalMessages: number;
  packageId: number;
  packageName: string;
  validTo: Date;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  companyName?: string;
  city?: string
}
