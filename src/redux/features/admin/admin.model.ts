export interface IAdmin {

}

export interface IPackage {
  id: number;
  label: string;
  dayDuration?: number;
  monthDuration?: number;
  messageAmount: number;
  price: number;
  status?: string;
}

export interface IOrder {
  id: string;
  userId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  businessName?: string;
  businessAddress?: string;
  emailReceipt?: string;
  taxId?: string;
  packages?: IPackage[];
}
