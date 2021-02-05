export interface IOrder {
  id: number;
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
}