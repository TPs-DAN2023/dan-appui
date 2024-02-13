'use client'

import { List, UserDetails, UserItem, Layout, UserHome } from "@/components";
import { useState } from "react";
import { getUsersMock } from "../../api";

export default function Usuarios() {
  
  const [usersResult, setUsersResult] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const getAllUsers = async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost/api/usuarios');
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setUsersResult(data);
  }

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List items={getUsersMock(1)} onClick={setSelectedItem}>
          {(item, onClick) => <UserItem user={item} onClick={onClick} />}
        </List>
      </div>

      <div className="flex flex-col flex-grow">
        <UserHome 
          show={!selectedItem} 
        />
        <UserDetails
          show={!!selectedItem}
          user={selectedItem}
          onClearSelectionPressed={() => setSelectedItem(null)}
        />
      </div>
    </Layout>
  );
}