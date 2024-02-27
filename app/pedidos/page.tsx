"use client";
import { API_URLS, apiCall, usersAPI } from "@/services";
import {
  List,
  OrderDetails,
  Item,
  Layout,
  Home,
  Loading,
  ConfirmDeletePopup,
  Error,
  Filters,
  ChangeOrderStatePopup,
} from "@/components";
import { useEffect, useState } from "react";
import { extractOrderAttributes, hasUserType } from "@/utils";
import { IOrder } from "@/interfaces";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";
import { ROUTES, USER_TYPES } from "@/constants";
import { useRouter } from "next/navigation";

function Pedidos() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedItem, setSelectedItem] = useState<IOrder>();
  const [isDeletingOrder, setIsDeletingOrder] = useState(false);
  const [isUpdatingOrderState, setIsUpdatingOrderState] = useState(false);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const [query, setQuery] = useState("");
  const [queryObject, setQueryObject] = useState({
    desde: "",
    hasta: "",
    razonSocial: "",
  });

  const router = useRouter();

  const handleNavigation = async (route: string) => {
    await router.push(route);
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await apiCall<IOrder[]>(API_URLS.orders + query, "GET");
        setOrders(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [reFetch, query]);

  const handleDelete = async () => {
    try {
      const data = await apiCall(
        `${API_URLS.orders}/${selectedItem?.id}`,
        "DELETE"
      );
      console.log("Pedido eliminado", data);
    } catch (error) {
      console.error(error);
    } finally {
      setReFetch(!reFetch);
      setIsDeletingOrder(false);
      setSelectedItem(undefined);
    }
  };

  const isPopupOpen = isDeletingOrder || isUpdatingOrderState;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <Filters
            query={queryObject}
            setQueryObject={setQueryObject}
            setQueryString={setQuery}
          />
          <List<IOrder>
            items={orders || []}
            onChangeOrderState={(item) => {
              setSelectedItem(item as IOrder);
              setIsUpdatingOrderState(true);
            }}
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
              onChangeOrderState,
              onUpdateStock,
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
                  onChangeOrderState={() =>
                    onChangeOrderState && onChangeOrderState(item)
                  }
                  onDelete={() => onDelete(item)}
                  onView={() => onView && onView(item)}
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
          <Home
            show={!selectedItem}
            icon={orders && orders.length > 0 ? faTruckField : undefined}
            title="Pedidos"
            subtitle={
              orders && orders.length > 0
                ? "Lista de pedidos"
                : "No existen pedidos creados"
            }
            description={
              orders && orders.length > 0
                ? hasUserType(USER_TYPES.ADMIN)
                  ? "Puede visualizar, editar o eliminar cualquier pedido de la lista."
                  : "Puede visualizar los detalles de cualquier pedido de la lista."
                : hasUserType(USER_TYPES.ADMIN)
                ? "No se ha creado ningún pedido."
                : "Cree un nuevo pedido para comenzar."
            }
            buttonText={
              hasUserType(USER_TYPES.USER)
                ? "Agregar productos para crear pedido"
                : "No debería estar aquí...	"
            }
            onClick={() => handleNavigation(ROUTES.PRODUCTS)}
            showButton={hasUserType(USER_TYPES.USER)}
          />
          <OrderDetails
            show={!!selectedItem}
            order={selectedItem}
            onClearSelectionPressed={() => setSelectedItem(undefined)}
          />
        </div>
      </Layout>
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmDeletePopup
            show={isDeletingOrder}
            onDelete={handleDelete}
            onCancel={() => setIsDeletingOrder(false)}
            messageTitle={`¿Está seguro que desea eliminar el pedido seleccionado (id=${selectedItem?.id})?`}
          />
          <ChangeOrderStatePopup
            show={isUpdatingOrderState}
            order={selectedItem}
            onCancel={() => setIsUpdatingOrderState(false)}
          />
        </div>
      )}
    </>
  );
}

export default withAuth(Pedidos);
