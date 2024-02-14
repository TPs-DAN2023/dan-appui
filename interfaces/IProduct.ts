import { ICategory, IProvider, IOrderDetail } from ".";

export default interface IProduct {
  id: number;
  nombre: string;
  descripcion: string;
  proveedor: IProvider;
  stockActual: number;
  categoria: ICategory;
  // OrdenProvisionDetalle: IOrderDetail[];
  precio: number;
}