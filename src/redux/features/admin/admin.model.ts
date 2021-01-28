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
  id: number;
  userId: string;
  packageId: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
