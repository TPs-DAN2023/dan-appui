import { useState } from "react";
import { CancelButton, ConfirmButton, FormInput } from "@/components";
import addProviderMock from "@/mocks/addProviderMock";
import { IProvider } from "@/interfaces";

interface CreateProviderProps {
  onCancel: () => void;
}

export default function CreateProvider({ onCancel }: CreateProviderProps) {
  const initialProviderState = {
    nombre: "",
    mail: "",
  };

  const [provider, setProvider] = useState<IProvider>(initialProviderState);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setProvider(initialProviderState);
    onCancel();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsCreatingProvider(true);
    // Here you can call your API to create the provider
    console.log("Proveedor creado!");
    addProviderMock(provider).then((res) => {
      console.log(res);
      setIsCreatingProvider(false);
      handleCancel(event);
    });
  };

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear proveedor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="text"
            placeholder="Nombre del proveedor"
            value={provider.nombre}
            required
            onChange={(e) =>
              setProvider({ ...provider, nombre: e.target.value })
            }
          />
          <FormInput
            type="email"
            placeholder="Mail del proveedor"
            value={provider.mail}
            required
            onChange={(e) => setProvider({ ...provider, mail: e.target.value })}
          />
          <div className="flex justify-around mt-4">
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            <ConfirmButton type="submit" disabled={isCreatingProvider}>
              {isCreatingProvider ? "Creando..." : "Crear"}
            </ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
