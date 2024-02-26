import { IOrder, IProduct } from ".";

// Julio: comento las que son parte de dan-ms-productos pero no de ms-pedidos
export default interface IOrderDetail {
  cantidad: number;
  descuento: number;
  producto: IProduct;
  total: number;
  // id?: number;
  // nombre: string;
  // precio: number;
  // stockActual: number;
  // ordenProvision: IOrder;
}