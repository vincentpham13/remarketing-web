import { IGenericEntityState } from "@/redux/interfaces";

export interface IOrder {
  id?: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  userId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  businessName?: string;
  businessAddress?: string;
  emailReceipt?: string;
  taxId?: string;
  packages?: IPackage[];
  promotionIds?: number[];
}
export interface IOrderState{
  promotion: IGenericEntityState & {
    promotions: any[],
    isValid: boolean
  }
}

export interface IInvalidPromotion{
  promotionCode: string;
  error: {
    message: string;
    code: number;
  };
}

export function instanceOfIInvalidPromotion(data: any): data is IInvalidPromotion { 
  return 'promotionCode' in data &&  'error' in data; 
} 

export interface IPromotionChecking {
  promotionCode: string;
  packageIds: number[];
  orderPrice: number;
}