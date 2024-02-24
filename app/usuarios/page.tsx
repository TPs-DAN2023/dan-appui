"use client";
import { API_URLS } from "@/services";
import {
  List,
  Layout,
  Home,
  Item,
  CreateOrUpdateUser,
  Loading,
  ConfirmDeletePopup,
  Error,
} from "@/components";
import { useState } from "react";
import { extractUserAttributes } from "@/utils";
import { IUser } from "@/interfaces";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";
import { useFetch } from "@/hooks";

function Usuarios() {
  const {
    data: users,
    error,
    isLoading,
  } = useFetch<IUser[]>(API_URLS.users, "GET");
  const [selectedItem, setSelectedItem] = useState<IUser>();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const isPopupOpen = isDeletingUser;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List<IUser>
          items={users || []}
          onEdit={(item) => {
            setSelectedItem(item as IUser);
            setIsUpdatingUser(true);
          }}
          onDelete={(item) => {
            setSelectedItem(item as IUser);
            setIsDeletingUser(true);
          }}
          renderItem={(
            item,
            onDelete,
            onRemoveFromCart,
            onAddToCart,
            onEdit
          ) => {
            console.log("onEdit", onEdit);
            const userAttributes = extractUserAttributes(item as IUser);
            return (
              <Item
                item={item}
                title={userAttributes.title}
                body={userAttributes.body}
                footer={userAttributes.footer}
                status={userAttributes.status}
                onDelete={() => onDelete(item)}
                onEdit={() => onEdit && onEdit(item)}
              />
            );
          }}
        />
      </div>

      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <Home
          show={!isCreatingUser && !isUpdatingUser}
          icon={users && users.length > 0 ? faUsers : undefined}
          title="Usuarios"
          subtitle={
            users && users.length > 0
              ? "Lista de usuarios"
              : "No existen usuarios"
          }
          description={
            users && users.length > 0
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

export default withAuth(Usuarios);
