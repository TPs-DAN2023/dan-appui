"use client";

import {
  List,
  UserDetails,
  Layout,
  Home,
  Item,
  CreateOrUpdateUser,
  Loading,
  ConfirmDeletePopup,
} from "@/components";
import { useEffect, useState } from "react";
import { getUsersMock } from "../../mocks";
import { extractUserAttributes } from "@/utils";
import { IUser } from "@/interfaces";
import { getUsers } from "@/services/usersAPI";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Usuarios() {
  const [usersResult, setUsersResult] = useState<IUser[]>([]);
  const [selectedItem, setSelectedItem] = useState<IUser>();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    // Fetch data from external API
    // const res = await fetch("http://localhost/api/usuarios");
    const res = await getUsersMock(1);
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setUsersResult(data);
    setIsLoading(false);
  };

  // TODO: Find if there is a way to avoid calling this useEffect twice
  useEffect(() => {
    getAllUsers();
  }, []);

  const isPopupOpen = isDeletingUser;

  if (isLoading) return <Loading />;

  return (
    <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List<IUser>
          items={usersResult}
          onEdit={(item) => {
            setSelectedItem(item as IUser);
            setIsUpdatingUser(true);
          }}
          onDelete={(item) => {
            setSelectedItem(item as IUser);
            setIsDeletingUser(true);
          }}
          renderItem={(item, onEdit, onDelete) => {
            const userAttributes = extractUserAttributes(item as IUser);
            return (
              <Item
                item={item}
                title={userAttributes.title}
                body={userAttributes.body}
                footer={userAttributes.footer}
                status={userAttributes.status}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
              />
            );
          }}
        />
      </div>

      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <Home
          show={!isCreatingUser && !isUpdatingUser}
          icon={usersResult.length > 0 ? faUsers : undefined}
          title="Usuarios"
          subtitle={
            usersResult.length > 0 ? "Lista de usuarios" : "No existen usuarios"
          }
          description={
            usersResult.length > 0
              ? "Puede editar o eliminar cualquier usuario de la lista."
              : "Cree un usuario para comenzar."
          }
          buttonText="Crear usuario"
          onClick={() => setIsCreatingUser(true)}
        />
        <CreateOrUpdateUser
          show={isUpdatingUser || isCreatingUser}
          onCancel={() => {
            setIsUpdatingUser(false);
            setIsCreatingUser(false);
            setSelectedItem(undefined);
          }}
          user={selectedItem}
        />
        {isPopupOpen && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ConfirmDeletePopup
              show={isDeletingUser}
              onDelete={() => {}}
              onCancel={() => setIsDeletingUser(false)}
              messageTitle={`¿Está seguro que desea eliminar el usuario seleccionado (id=${selectedItem?.id})?`}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
