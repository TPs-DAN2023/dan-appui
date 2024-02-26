import { IOrderDetail, IOrderState, ICliente } from ".";
// Julio: comento las que son parte de dan-ms-productos pero no de ms-pedidos
export default interface IOrder {
  id?: string;
  numeroPedido: number | string;
  fecha: string;
  observaciones: string;
  total: number;
  user: string; // Just userName
  estados: IOrderState[];
  detallePedido: IOrderDetail[];
  cliente?: ICliente;
  // fechaGeneracion: string;
  // fechaRecepcion: string;
  // user: IUser;
  // esCancelada: boolean;
  // proveedor: IProvider;
  // detalles: IOrderDetail[];
}