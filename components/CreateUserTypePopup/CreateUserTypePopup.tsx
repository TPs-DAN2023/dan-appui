import { CancelButton, ConfirmButton, FormInput } from "@/components";
import { useState } from "react";

interface CreateUserTypeProps {
  onCancel: () => void;
}

export default function CreateUserType({ onCancel }: CreateUserTypeProps) {
  const [userTypeName, setUserTypeName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the userType
    console.log(`Tipo de usuario creado: ${userTypeName}!`);
  };

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear tipo usuario</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nombre del tipo usuario"
            value={userTypeName}
            onChange={(e) => setUserTypeName(e.target.value)}
          />
          <div className="flex justify-around mt-4">
            <CancelButton
              onClick={(event: any) => {
                event.preventDefault();
                onCancel();
              }}
            >
              Cancelar
            </CancelButton>
            <ConfirmButton type="submit">Crear</ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
