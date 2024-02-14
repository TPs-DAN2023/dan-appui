
interface CreateProductProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateProduct ({ show, onCancel }: CreateProductProps) {

  if (!show) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Crear producto</h1>
      <div className="flex flex-col items-center justify-center">
        <input type="text" placeholder="Nombre del producto" className="border-2 border-gray-300 p-2 m-2" />
        <input type="text" placeholder="Descripción del producto" className="border-2 border-gray-300 p-2 m-2" />
        
        <div className="flex items-center">
          <span>$</span>
          <input type="number" placeholder="Precio del producto" className="border-2 border-gray-300 p-2 m-2" min="0" />
        </div>
        <input type="number" placeholder="Stock inicial" className="border-2 border-gray-300 p-2 m-2" min="0" />
        {/* I need two list one with categories and another with providers for user to select */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <select className="border-2 border-gray-300 p-2 m-2">
              <option value="" hidden>Seleccione una categoría</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
            <button className="text-blue-500 p-2 m-2">+ Crear categoría</button>
          </div>
          <div className="flex items-center">
            <select className="border-2 border-gray-300 p-2 m-2">
              <option value="" hidden>Seleccione un proveedor</option>
              <option value="1">Provider 1</option>
              <option value="2">Provider 2</option>
              <option value="3">Provider 3</option>
            </select>
            <button className="text-blue-500 p-2 m-2">+ Crear proveedor</button>
          </div>
        </div>
        <footer className="flex gap-x-10">
          <button onClick={onCancel} className="bg-red-500 text-white p-2 m-2 hover:bg-red-700">Cancelar</button>
          <button className="bg-blue-500 text-white p-2 m-2 hover:bg-blue-700">Crear producto</button>
        </footer>
      </div>
    </div>
  )
}