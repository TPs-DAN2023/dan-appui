import { useState } from "react";
import { CancelButton, ConfirmButton, FormInput } from "@/components";

interface CreateProviderProps {
  onCancel: () => void;
}

export default function CreateProvider({ onCancel }: CreateProviderProps) {
  const [providerName, setProviderName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the provider
    console.log(`Proveedor creado: ${providerName}!`);
  };

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear proveedor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="text"
            placeholder="Nombre del proveedor"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
          />
          <FormInput type="email" placeholder="Correo electrónico" />
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
