import { API_URLS } from "@/services";
import { CancelButton, ConfirmButton, FormInput } from "@/components";
import { IUserType } from "@/interfaces";
import { useState } from "react";
import { getUserToken } from "@/utils";

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
      const response = await fetch(API_URLS.userTypes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify(userType),
      });

      if (!response.ok) {
        throw new Error("Error creating user type");
      }

      const newUserType = await response.json();
      console.log("Tipo de usuario creado!", newUserType);
      setIsCreatingUserType(false);
      handleCancel(event);
    } catch (error) {
      console.error(error);
      setIsCreatingUserType(false);
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
            <CancelButton type="button" onClick={handleCancel}>
              Cancelar
            </CancelButton>
            <ConfirmButton type="submit" disabled={isCreatingUserType}>
              {isCreatingUserType ? "Creando..." : "Crear"}
            </ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
