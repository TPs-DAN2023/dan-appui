"use client";

import {
  List,
  OrderDetails,
  Item,
  Layout,
  Home,
  CreateOrder,
} from "@/components";
import { useState } from "react";
import { getOrdersMock } from "../../api";
import { extractOrderAttributes } from "@/utils";
import { IOrder } from "@/interfaces";

export default function Pedidos() {
  const [ordersResult, setOrdersResult] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const getAllPedidos = async () => {
    // Fetch data from external API
    const res = await fetch("http://localhost/api/pedidos");
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setOrdersResult(data);
  };

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List items={getOrdersMock(1)} onClick={setSelectedItem}>
          {/* {(item, onClick) => <OrderItem order={item} onClick={onClick} />} */}
          {(item: IOrder, onClick: any): any => {
            const orderAttributes = extractOrderAttributes(item);
            return (
              <Item
                item={item}
                title={orderAttributes.title}
                body={orderAttributes.body}
                footer={orderAttributes.footer}
                status={orderAttributes.status}
                onView={onClick}
                onEdit={() => console.log("Not yet implemented!")}
                onDelete={() => console.log("Not yet implemented!")}
              />
            );
          }}
        </List>
      </div>
      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <Home
          show={!selectedItem && !isCreatingOrder}
          title="Pedidos"
          subtitle="No hay ningún pedido seleccionado"
          description="Seleccione un pedido de la lista para visualizar el detalle del mismo."
          buttonText="Crear pedido"
          onClick={() => setIsCreatingOrder(true)}
        />
        <OrderDetails
          show={!!selectedItem}
          order={selectedItem}
          onClearSelectionPressed={() => setSelectedItem(null)}
        />
        <CreateOrder
          show={!selectedItem && isCreatingOrder}
          onCancel={() => setIsCreatingOrder(false)}
        />
      </div>
    </Layout>
  );
}
