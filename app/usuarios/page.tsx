"use client";
import { API_URLS, apiCall } from "@/services";
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
import { useEffect, useState } from "react";
import { extractUserAttributes } from "@/utils";
import { IUser } from "@/interfaces";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";

function Usuarios() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedItem, setSelectedItem] = useState<IUser>();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await apiCall<IUser[]>(API_URLS.users, "GET");
        setUsers(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [reFetch]);

  const handleDelete = async () => {
    try {
      const data = await apiCall(
        `${API_URLS.users}/${selectedItem?.id}`,
        "DELETE"
      );
      console.log("Usuario eliminado", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingUser(false);
      setSelectedItem(undefined);
      setReFetch(!reFetch);
    }
  };

  const isPopupOpen = isDeletingUser;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Layout>
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
            onChangeOrderState,
            onUpdateStock,
            onRemoveFromCart,
            onAddToCart,
            onEdit
          ) => {
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
            setReFetch(!reFetch);
          }}
          user={selectedItem}
        />
        {isPopupOpen && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-50 bg-white">
            <ConfirmDeletePopup
              show={isDeletingUser}
              onDelete={handleDelete}
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
