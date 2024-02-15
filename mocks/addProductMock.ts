import { IProduct } from "@/interfaces";

export default async function addProductMock(product: IProduct) {
  console.log("Agregando producto...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return {
    id: 6,
    nombre: product.nombre,
    descripcion: product.descripcion,
    proveedorId: product.proveedor?.id,
    stockActual: product.stockActual,
    categoriaId: product.categoria?.id,
    proveedor: product.proveedor,
    categoria: product.categoria,
    precio: product.precio,
  };
}
