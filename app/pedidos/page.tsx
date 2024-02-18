"use client";

import {
  List,
  OrderDetails,
  Item,
  Layout,
  Home,
  CreateOrder,
  Loading,
  ConfirmDeletePopup,
} from "@/components";
import { useEffect, useState } from "react";
import { getOrdersMock } from "../../mocks";
import { extractOrderAttributes } from "@/utils";
import { IOrder } from "@/interfaces";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";

export default function Pedidos() {
  const [ordersResult, setOrdersResult] = useState<IOrder[]>([]);
  const [selectedItem, setSelectedItem] = useState<IOrder>();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isDeletingOrder, setIsDeletingOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAllPedidos = async () => {
    // Fetch data from external API
    // const res = await fetch("http://localhost/api/pedidos");
    const res = await getOrdersMock(1);
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setOrdersResult(data);
    setIsLoading(false);
  };

  // TODO: Find if there is a way to avoid calling this useEffect twice
  useEffect(() => {
    getAllPedidos();
  }, []);

  const isPopupOpen = isDeletingOrder;

  if (isLoading) return <Loading />;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <List<IOrder>
            items={ordersResult}
            onView={(item) => setSelectedItem(item as IOrder)}
            onEdit={(item) => {
              setSelectedItem(item as IOrder);
              setIsUpdatingOrder(true);
            }}
            onDelete={(item) => {
              setSelectedItem(item as IOrder);
              setIsDeletingOrder(true);
            }}
            renderItem={(item, onEdit, onDelete, onView) => {
              const orderAttributes = extractOrderAttributes(item as IOrder);
              return (
                <Item
                  item={item}
                  title={orderAttributes.title}
                  body={orderAttributes.body}
                  footer={orderAttributes.footer}
                  status={orderAttributes.status}
                  onView={() => onView && onView(item)}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)}
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
          <Home
            show={!isUpdatingOrder && !isCreatingOrder}
            icon={ordersResult.length > 0 ? faTruckField : undefined}
            title="Pedidos"
            subtitle={
              ordersResult.length > 0
                ? "Lista de pedidos"
                : "No existen pedidos creados"
            }
            description={
              ordersResult.length > 0
                ? "Puede visualizar, editar o eliminar cualquier pedido de la lista."
                : "Cree un producto para comenzar."
            }
            buttonText="Crear pedido"
            onClick={() => setIsCreatingOrder(true)}
          />
          <OrderDetails
            show={!!selectedItem}
            order={selectedItem}
            onClearSelectionPressed={() => setSelectedItem(undefined)}
          />
          <CreateOrder
            show={!selectedItem && isCreatingOrder}
            onCancel={() => {
              setIsCreatingOrder(false);
              setSelectedItem(undefined);
            }}
          />
        </div>
      </Layout>
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmDeletePopup
            show={isDeletingOrder}
            onDelete={() => {}}
            onCancel={() => setIsDeletingOrder(false)}
            messageTitle={`¿Está seguro que desea eliminar el pedido seleccionado (id=${selectedItem?.id})?`}
          />
        </div>
      )}
    </>
  );
}
