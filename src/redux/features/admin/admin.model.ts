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