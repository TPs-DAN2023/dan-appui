import { IProduct } from "@/interfaces";

export default function extractProductAttributes(product: IProduct) {
  const attributes = { title: "", body: [""], footer: "", status: "" };
  attributes.title = product.descripcion;
  attributes.body = [`Precio: $${product.precio}`, `Stock: ${product.stockActual}`];
  attributes.footer = `ID: ${product.id}`;

  return attributes;
}