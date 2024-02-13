import Button from "../Button/Button";

interface UserHomeProps {
  show: boolean;
}

export default function UserHome ({ show }: UserHomeProps) {
  
  if (!show) {
    return null;
  }
  return (
    <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
      <h1 className="text-4xl font-bold">Usuarios</h1>
      <p className="text-xl text-pretty max-w-[700px] ">Seleccione algún usuario del listado para ver sus características. Si desea cargar uno nuevo presione el siguiente botón:</p>
      <Button onClick={() => {}}>Crear un usuario</Button>      
    </div>
  );
}