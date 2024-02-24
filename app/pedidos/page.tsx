"use client";
import { API_URLS } from "@/services";
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
import { useState } from "react";
import { extractOrderAttributes } from "@/utils";
import { IOrder } from "@/interfaces";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";
import { useFetch } from "@/hooks";

function Pedidos() {
  const {
    data: orders,
    error,
    isLoading,
  } = useFetch<IOrder[]>(API_URLS.orders, "GET");
  const [selectedItem, setSelectedItem] = useState<IOrder>();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isDeletingOrder, setIsDeletingOrder] = useState(false);

  const isPopupOpen = isDeletingOrder;

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <List<IOrder>
            items={orders || []}
            onView={(item) => {
              console.log("Viewing item", item);
              setSelectedItem(item as IOrder);
            }}
            onDelete={(item) => {
              setSelectedItem(item as IOrder);
              setIsDeletingOrder(true);
            }}
            renderItem={(
              item,
              onDelete,
              onRemoveFromCart,
              onAddToCart,
              onEdit,
              onView
            ) => {
              const orderAttributes = extractOrderAttributes(item as IOrder);
              return (
                <Item
                  item={item}
                  title={orderAttributes.title}
                  body={orderAttributes.body}
                  footer={orderAttributes.footer}
                  status={orderAttributes.status}
                  onDelete={() => onDelete(item)}
                  onView={() => onView && onView(item)}
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
          <Home
            show={!isCreatingOrder && !selectedItem}
            icon={orders && orders.length > 0 ? faTruckField : undefined}
            title="Pedidos"
            subtitle={
              orders && orders.length > 0
                ? "Lista de pedidos"
                : "No existen pedidos creados"
            }
            description={
              orders && orders.length > 0
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

export default withAuth(Pedidos);
