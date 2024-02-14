import IProduct from "./IProduct";

export default interface ICategory {
  id: number;
  nombre: string;
  productos: IProduct[];
}