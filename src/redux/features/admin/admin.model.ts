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
  packageTypeId: number;
}

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
}

export interface IPromotion {
  id?: number;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  quantity: number;
  messageAmount?: number;
  monthDuration?: number;
  validPackageIds?: number[];
  validTo: Date;
}
