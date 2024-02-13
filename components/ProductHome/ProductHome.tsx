import Button from "../Button/Button";

interface ProductHomeProps {
  show: boolean;
  onCreateProductPressed: () => void;
}

export default function ProductHome ({ show, onCreateProductPressed }: ProductHomeProps) {
  
  if (!show) {
    return null;
  }
  return (
    <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
      <h1 className="text-4xl font-bold">Productos</h1>
      <p className="text-xl text-pretty max-w-[700px] ">Seleccione algún producto del listado para ver sus características. Si desea cargar uno nuevo presione el siguiente botón:</p>
      <Button onClick={onCreateProductPressed}>Crear un producto</Button>      
    </div>
  );
}