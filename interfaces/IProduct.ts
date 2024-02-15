import { ICategory, IProvider, IOrderDetail } from ".";

export default interface IProduct {
  id?: number;
  nombre: string;
  descripcion: string;
  proveedor?: IProvider | null;
  stockActual: number;
  categoria?: ICategory | null;
  // OrdenProvisionDetalle: IOrderDetail[];
  precio: number;
}