import { IOrder, IProduct } from ".";

export default interface IProvider {
  id?: number;
  nombre: string;
  mail: string;
  // productos: IProduct[];
  // ordenesDeProvision: IOrder[];
}