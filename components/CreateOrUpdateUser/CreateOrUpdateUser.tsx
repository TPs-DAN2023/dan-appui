import { API_URLS, apiCall } from "@/services";
import {
  Button,
  ConfirmCancelPopup,
  CreateUserTypePopup,
  FormInput,
  OpenDialogButton,
} from "@/components";
import { IUser, IUserType } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface CreateOrUpdateUserProps {
  show: boolean;
  onCancel: () => void;
  user?: IUser;
}

const emptyUser = {
  userName: "",
  password: "",
  correoElectronico: "",
  tipoUsuario: null,
};

export default function CreateOrUpdateUser({
  show,
  onCancel,
  user: userToUpdate,
}: CreateOrUpdateUserProps) {
  const [user, setUser] = useState<IUser>(emptyUser);
  const [isCreatingUserType, setIsCreatingUserType] = useState(false);
  const [userTypes, setUserTypes] = useState<IUserType[]>([]);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchUserTypes = await apiCall(`${API_URLS.userTypes}`, "GET");
        setUserTypes(fetchUserTypes as IUserType[]); // Explicitly type fetchUserTypes as IUserType[]
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    if (userToUpdate) {
      setUser(userToUpdate);
    } else {
      // I want to set the user emptyUser if user has no data in it
      setUser((u) => {
        if (!u) {
          return emptyUser;
        }
        return u;
      });
      setUserTypes([]);
    }
  }, [userToUpdate, show, reFetch]);

  const handleCancel = (event: React.FormEvent) => {
    event.preventDefault();
    setUser(emptyUser);
    setIsCanceling(false);
    setIsCreatingUserType(false);
    console.log(
      `Cancelando la ${
        userToUpdate ? "actualización" : "creación"
      } del usuario...`
    );
    onCancel();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreatingUser(true);
    console.log(
      `Enviando ${userToUpdate ? "actualización" : "creación"} del usuario...`,
      user
    );
    try {
      const data = await apiCall(
        `${API_URLS.users}${userToUpdate ? `/${userToUpdate.id}` : ""}`,
        userToUpdate ? "PUT" : "POST",
        user
      );
      console.log(`Usuario ${userToUpdate ? "actualizado" : "creado"}!`, data);
      handleCancel(event);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const allInputsAreValid = () => {
    return (
      user.userName.length > 3 &&
      user.password!.length > 12 &&
      user.password!.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}$/) &&
      user.correoElectronico.length > 5 &&
      user.correoElectronico.includes("@") &&
      user.tipoUsuario
    );
  };

  const isPopupOpen = isCreatingUserType || isCanceling;

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-grow items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center ${
          isPopupOpen ? "opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold">
          {userToUpdate ? "Actualizar" : "Crear"} usuario
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="text"
            placeholder="Username del usuario"
            value={user.userName}
            required
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <FormInput
            type="password"
            placeholder="Contraseña del usuario"
            value={user.password}
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <FormInput
            type="email"
            placeholder="Correo electrónico"
            value={user.correoElectronico}
            required
            onChange={(e) =>
              setUser({ ...user, correoElectronico: e.target.value })
            }
          />
          <div className="flex items-center justify-center">
            <select
              className="border-2 border-gray-300 p-2 m-2"
              value={user.tipoUsuario?.id}
              onFocus={() => setReFetch(!reFetch)}
              required
              onChange={(e) =>
                setUser({
                  ...user,
                  tipoUsuario: userTypes.find(
                    (ut: IUserType) => ut.id === parseInt(e.target.value)
                  ),
                })
              }
            >
              <option value="" hidden>
                Seleccione un tipo usuario
              </option>
              {userTypes.map((ut: IUserType) => (
                <option key={ut.id} value={ut.id}>
                  {ut.tipo}
                </option>
              ))}
            </select>
            <OpenDialogButton
              type="button"
              disabled={true}
              onClick={() => setIsCreatingUserType(true)}
            >
              + Crear tipo usuario
            </OpenDialogButton>
          </div>
          <footer className="flex justify-around mt-5">
            <Button
              color="red"
              type="button"
              onClick={(event) =>
                userToUpdate ? handleCancel(event) : setIsCanceling(true)
              }
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!allInputsAreValid() || isCreatingUser}
            >
              {userToUpdate
                ? isCreatingUser
                  ? "Actualizando..."
                  : "Actualizar"
                : isCreatingUser
                ? "Creando..."
                : "Crear"}
            </Button>
          </footer>
        </form>
      </div>

      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateUserTypePopup
            show={isCreatingUserType}
            onCancel={() => {
              setIsCreatingUserType(false);
              setReFetch(!reFetch); // TODO: See if works
            }}
          />

          <ConfirmCancelPopup
            show={isCanceling}
            onCancel={() => setIsCanceling(false)}
            onConfirm={handleCancel}
            messageTitle="¿Desea cancelar la creación del usuario?"
          />
        </div>
      )}
    </div>
  );
}
