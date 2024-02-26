import { OrderStates } from "@/enums";

export default interface IOrderState {
  detalle: string;
  estado: OrderStates;
  fechaEstado: string;
  userEstado: string;
}