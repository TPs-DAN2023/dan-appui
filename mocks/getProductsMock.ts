import { IProduct } from "@/interfaces";

export default  function getProductsMock(): IProduct[] {
  console.log("Buscando productos...");

  // Retrieve categories data from localStorage
  const categoriesData = JSON.parse(localStorage.getItem('mocks') || '[]').categorias;
  // Retrieve providers data from localStorage
  const providersData = JSON.parse(localStorage.getItem('mocks') || '[]').proveedores;

  return [
    {
      id: 1,
      nombre: "Pepsi",
      descripcion: "Qué rica gaseosa es!",
      stockActual: 10,
      proveedor: providersData.find((prov: any) => prov.id === 1),
      categoria: categoriesData.find((cat: any) => cat.id === 5),
      precio: 100,
    },
    {
      id: 5,
      nombre: "Queso de oveja",
      descripcion: "Qué rico es!",
      stockActual: 10,
      proveedor: providersData.find((prov: any) => prov.id === 2),
      categoria: categoriesData.find((cat: any) => cat.id === 2),
      precio: 200,
    },
  ];
}
