import {
  CancelButton,
  ConfirmButton,
  ConfirmCancelPopup,
  CreateUserTypePopup,
  FormInput,
  OpenDialogButton,
} from "@/components";
import { IUser, IUserType } from "@/interfaces";
import { addUserMock, getUserTypesMock } from "@/mocks";
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

  useEffect(() => {
    if (userToUpdate) {
      fetchUserTypes();
      setUser(userToUpdate);
    } else {
      setUser(emptyUser);
      setUserTypes([]);
    }
  }, [userToUpdate, show]);

  const [isCreatingUserType, setIsCreatingUserType] = useState(false);
  const [userTypes, setUserTypes] = useState<IUserType[]>([]);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const fetchUserTypes = async () => {
    // Here you can call your API to fetch the user types
    // const res = await fetch("http://localhost/api/tipo-usuarios");
    console.log("Fetching user types...");
    const res = await getUserTypesMock();
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setUserTypes(data);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    setUser(emptyUser);
    setIsCanceling(false);
    setIsCreatingUserType(false);
    console.log("Cancelando...");
    onCancel();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsCreatingUser(true);
    console.log(`Usuario creado!`);
    addUserMock(user).then((res) => {
      console.log(res);
      setIsCreatingUser(false);
      handleCancel(event);
    });
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
              onFocus={fetchUserTypes}
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
