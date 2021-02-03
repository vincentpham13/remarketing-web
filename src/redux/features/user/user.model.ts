import { IOrder, IPackage } from "../admin/admin.model";
import { ICampaign } from "../campaign/campaign.model";

export interface IUserState {
  id: string,
  picture: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  successMessages: number;
  totalMessages: number;
}

export interface IUserInfoDashboard {
  pageCount: number;
  userPlan: {
    totalMessages: number;
    successMessages: number;
    validTo?: Date;
    label: string;
  };
  runningCampaign: number;
  completedCampaign: number;
  recentCampaign?: ICampaign[],
  recentOrder?: IOrder[]
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  job: string;
}
