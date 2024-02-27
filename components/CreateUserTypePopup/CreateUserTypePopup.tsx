import { API_URLS, apiCall } from "@/services";
import { Button, FormInput } from "@/components";
import { IUserType } from "@/interfaces";
import { useState } from "react";

interface CreateUserTypeProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateUserType({
  show,
  onCancel,
}: CreateUserTypeProps) {
  const initialUserTypeState = {
    tipo: "",
  };
  const [userType, setUserType] = useState<IUserType>(initialUserTypeState);
  const [isCreatingUserType, setIsCreatingUserType] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setUserType(initialUserTypeState);
    onCancel();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsCreatingUserType(true);

    try {
      const newUserType = await apiCall<IUserType>(
        API_URLS.userTypes,
        "POST",
        userType
      );
      console.log("Tipo de usuario creado!", newUserType);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingUserType(false);
      handleCancel(event);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear tipo usuario</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nombre del tipo usuario"
            value={userType.tipo}
            required
            onChange={(e) => setUserType({ ...userType, tipo: e.target.value })}
          />
          <div className="flex justify-around mt-4">
            <Button color="red" type="button" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreatingUserType}>
              {isCreatingUserType ? "Creando..." : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
