import { OrderState } from "@/enums/OrderState";
import { IProvider, IOrderDetail, IUser } from ".";

// Julio: comento las que son parte de dan-ms-productos pero no de ms-pedidos
export interface IOrder {
  id?: string;
  // fechaGeneracion: string;
  // fechaRecepcion: string;
  fecha: string;
  user: IUser;
  observaciones: string;
  // esCancelada: boolean;
  proveedor: IProvider;
  // detalles: IOrderDetail[];
  detallePedido: IOrderDetail[];
  estados: OrderState[];
  total: number;
}