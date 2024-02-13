'use client'

import { List, OrderDetails, OrderItem, Item, Layout, OrderHome } from "@/components";
import { useState } from "react";
import { getOrdersMock } from "../../api";
import { extractOrderAttributes } from "@/utils";

interface OrderProps {
  id: string;
  fechaPedido: string;
  estado: { id: string; estado: string };
  detalle: { id: string; producto: { id: number; descripcion: string; precio: number }; cantidad: number; precio: number }[];
}

export default function Pedidos() {

  const [ordersResult, setOrdersResult] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const getAllPedidos = async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost/api/pedidos');
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setOrdersResult(data);
  }

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List items={getOrdersMock(1)} onClick={setSelectedItem}>
          {/* {(item, onClick) => <OrderItem order={item} onClick={onClick} />} */}
          {(item: OrderProps, onClick: any): any => {
            const orderAttributes = extractOrderAttributes(item);
            // See why infinite loop
            <Item title={orderAttributes.title} body={orderAttributes.body} footer={orderAttributes.footer} status={orderAttributes.status} onClick={onClick(item)} />}
          }
        </List>
      </div>
      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <OrderHome 
          show={!selectedItem} 
        />
        <OrderDetails
          show={!!selectedItem}
          order={selectedItem}
          onClearSelectionPressed={() => setSelectedItem(null)}
        />
      </div>
    </Layout>
  );
}