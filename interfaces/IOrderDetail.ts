import { IOrder, IProduct } from ".";

export default interface IOrderDetail {
  id?: number;
  ordenProvision: IOrder;
  cantidad: number;
  producto: IProduct;
  precio: number;
}