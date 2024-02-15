import {
  CancelButton,
  ConfirmButton,
  CreateUserTypePopup,
  FormInput,
  OpenDialogButton,
} from "@/components";
import { useState } from "react";

interface CreateUserProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateUser({ show, onCancel }: CreateUserProps) {
  const [isCreatingUserType, setIsCreatingUserType] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the provider
    console.log(`Usuario creado!`);
  };

  const allInputsAreValid = () => {
    // Here you can add your validation logic
    return true;
  };

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-grow items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center ${
          isCreatingUserType ? "opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold">Crear usuario</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput type="text" placeholder="Username del usuario" />
          <FormInput type="password" placeholder="Contraseña del usuario" />
          <FormInput type="email" placeholder="Correo electrónico" min="0" />
          <div className="flex items-center justify-center">
            <select className="border-2 border-gray-300 p-2 m-2">
              <option value="" hidden>
                Seleccione un tipo usuario
              </option>
              <option value="GERENTE">GERENTE</option>
              <option value="EMPLEADO">EMPLEADO</option>
            </select>
            <OpenDialogButton onClick={() => setIsCreatingUserType(true)}>
              + Crear tipo usuario
            </OpenDialogButton>
          </div>
          <footer className="flex justify-around mt-5">
            <CancelButton
              onClick={(event: any) => {
                event.preventDefault();
                onCancel();
              }}
            >
              Cancelar
            </CancelButton>
            <ConfirmButton type="submit" disabled={!allInputsAreValid()}>
              Crear
            </ConfirmButton>
          </footer>
        </form>
      </div>

      {isCreatingUserType && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateUserTypePopup onCancel={() => setIsCreatingUserType(false)} />
        </div>
      )}
    </div>
  );
}
