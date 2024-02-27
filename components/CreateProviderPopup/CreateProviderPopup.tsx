import { API_URLS, apiCall } from "@/services";
import { useState } from "react";
import { Button, FormInput } from "@/components";
import { IProvider } from "@/interfaces";

interface CreateProviderProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateProvider({
  show,
  onCancel,
}: CreateProviderProps) {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsCreatingProvider(true);

    try {
      const newProvider = await apiCall<IProvider>(
        API_URLS.providers,
        "POST",
        provider
      );
      console.log("Proveedor creado!", newProvider);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingProvider(false);
      handleCancel(event);
    }
  };

  if (!show) {
    return null;
  }

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
            <Button color="red" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreatingProvider}>
              {isCreatingProvider ? "Creando..." : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
