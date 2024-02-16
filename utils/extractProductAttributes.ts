import { IProduct } from "@/interfaces";

export default function extractProductAttributes(product: IProduct) {
  const attributes = { title: "", body: [""], footer: "", status: "" };
  attributes.title = `${product.id} - ${product.nombre}`;
  attributes.body = [`Descripción: ${product.descripcion}`, `Precio: $${product.precio}`, `Stock actual: ${product.stockActual}`, `Proveedor: ${product.proveedor?.nombre} (id=${product.proveedor?.id})`];
  attributes.footer = `Categoría: ${product.categoria?.nombre}`;

  return attributes;
}