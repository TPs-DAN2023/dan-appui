"use client";

import {
  List,
  UserDetails,
  Layout,
  Home,
  Item,
  CreateUser,
} from "@/components";
import { useEffect, useState } from "react";
import { getUsersMock } from "../../mocks";
import { extractUserAttributes } from "@/utils";
import { IUser } from "@/interfaces";
import { getUsers } from "@/services/usersAPI";

export default function Usuarios() {
  const [usersResult, setUsersResult] = useState<IUser[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async () => {
    setIsLoading(true);
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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando usuarios...</p>
          </div>
        ) : (
          <List items={usersResult} onClick={setSelectedItem}>
            {/* {(item, onClick) => <UserItem user={item} onClick={onClick} />} */}
            {(item: IUser, onClick: any): any => {
              const userAttributes = extractUserAttributes(item);
              return (
                <Item
                  item={item}
                  title={userAttributes.title}
                  body={userAttributes.body}
                  footer={userAttributes.footer}
                  status={userAttributes.status}
                  onView={onClick}
                  onEdit={() => console.log("Not yet implemented!")}
                  onDelete={() => console.log("Not yet implemented!")}
                />
              );
            }}
          </List>
        )}
      </div>

      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <Home
          show={!selectedItem && !isCreatingUser}
          title="Usuarios"
          subtitle="No hay ningún usuario seleccionado"
          description="Seleccione un usuario de la lista para visualizar el detalle del mismo."
          buttonText="Crear usuario"
          onClick={() => setIsCreatingUser(true)}
        />
        <UserDetails
          show={!!selectedItem}
          user={selectedItem}
          onClearSelectionPressed={() => setSelectedItem(null)}
        />
        <CreateUser
          show={!selectedItem && isCreatingUser}
          onCancel={() => setIsCreatingUser(false)}
        />
      </div>
    </Layout>
  );
}
