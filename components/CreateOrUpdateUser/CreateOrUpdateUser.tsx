import { API_URLS } from "@/services";
import {
  CancelButton,
  ConfirmButton,
  ConfirmCancelPopup,
  CreateUserTypePopup,
  FormInput,
  OpenDialogButton,
} from "@/components";
import { IUser, IUserType } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useFetch } from "@/hooks";

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
  const {
    data: fetchedUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useFetch<IUser>(
    userToUpdate ? API_URLS.users + "/" + userToUpdate.id : "",
    "GET"
  );

  const {
    data: fetchedUserTypes,
    error: errorUserTypes,
    isLoading: isLoadingUserTypes,
  } = useFetch<IUserType[]>(API_URLS.userTypes, "GET");

  useEffect(() => {
    if (userToUpdate) {
      setUser(fetchedUser || emptyUser);
      setUserTypes(fetchedUserTypes || []);
    } else {
      setUser(emptyUser);
      setUserTypes([]);
    }
  }, [userToUpdate, fetchedUser, fetchedUserTypes]);

  const [isCreatingUserType, setIsCreatingUserType] = useState(false);
  const [userTypes, setUserTypes] = useState<IUserType[]>([]);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    setUser(emptyUser);
    setIsCanceling(false);
    setIsCreatingUserType(false);
    console.log("Cancelando...");
    onCancel();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsCreatingUser(true);

    try {
      const response = await fetch(API_URLS.users, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Error creating user");
      }

      const newUser = await response.json();
      console.log("Usuario creado!", newUser);
      setIsCreatingUser(false);
      handleCancel(event);
    } catch (error) {
      console.error(error);
      setIsCreatingUser(false);
    }
    // const {
    //   data: user,
    //   error: error,
    //   isLoading: isLoading,
    // } = useFetch<IUser>(API_URLS.users, "POST", user);
    // console.log(`Usuario creado!`);
    // setIsCreatingUser(false);
    // handleCancel(event);
    // addUserMock(user).then((res) => {
    //   console.log(res);
    //   setIsCreatingUser(false);
    //   handleCancel(event);
    // });
  };

  const allInputsAreValid = () => {
    return (
      user.userName.length > 5 &&
      user.password.length > 12 &&
      user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}$/) &&
      user.correoElectronico.length > 5 &&
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
        <h1 className="text-2xl font-bold">Crear usuario</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="text"
            placeholder="UserName del usuario"
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
              onFocus={() => console.log(user.tipoUsuario?.id)}
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
              onClick={() => setIsCreatingUserType(true)}
            >
              + Crear tipo usuario
            </OpenDialogButton>
          </div>
          <footer className="flex justify-around mt-5">
            <CancelButton
              type="button"
              onClick={(event) =>
                userToUpdate ? handleCancel(event) : setIsCanceling(true)
              }
            >
              Cancelar
            </CancelButton>
            <ConfirmButton
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
            </ConfirmButton>
          </footer>
        </form>
      </div>

      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateUserTypePopup
            show={isCreatingUserType}
            onCancel={() => setIsCreatingUserType(false)}
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
