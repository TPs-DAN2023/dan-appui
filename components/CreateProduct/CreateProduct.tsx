
interface CreateProductProps {
  show: boolean;
  onClose: () => void;
}

export default function CreateProduct ({ show, onClose }: CreateProductProps) {

  if (!show) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Crear producto</h1>
      <div className="flex flex-col items-center justify-center">
        <input type="text" placeholder="Nombre del producto" className="border-2 border-gray-300 p-2 m-2" />
        <input type="text" placeholder="Descripción del producto" className="border-2 border-gray-300 p-2 m-2" />
        <input type="number" placeholder="Precio del producto" className="border-2 border-gray-300 p-2 m-2" />
        <input type="number" placeholder="Stock inicial" className="border-2 border-gray-300 p-2 m-2" />
        {/* I need two list one with categories and another with providers for user to select */}
        <select className="border-2 border-gray-300 p-2 m-2">
          <option value="" hidden>Seleccione una categoría</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
        <select className="border-2 border-gray-300 p-2 m-2">
          <option value="" hidden>Seleccione un proveedor</option>
          <option value="1">Provider 1</option>
          <option value="2">Provider 2</option>
          <option value="3">Provider 3</option>
        </select>
        <button className="bg-blue-500 text-white p-2 m-2">Crear producto</button>
        <button onClick={onClose} className="bg-red-500 text-white p-2 m-2">Cancelar</button>
      </div>
    </div>
  )
}