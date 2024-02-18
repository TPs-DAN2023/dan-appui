"use client";

import {
  List,
  Layout,
  Home,
  Item,
  Loading,
  ConfirmDeletePopup,
} from "@/components";
import { useEffect, useState } from "react";
import { getProductsMock } from "../../mocks";
import CreateOrUpdateProduct from "@/components/CreateOrUpdateProduct/CreateOrUpdateProduct";
import { extractProductAttributes } from "@/utils";
import { IProduct } from "@/interfaces";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

export default function Productos() {
  const [productsResult, setProductsResult] = useState<IProduct[]>([]);
  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAllProducts = async () => {
    // Fetch data from external API
    // const res = await fetch("http://localhost/api/productos");
    const res = await getProductsMock(1);
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setProductsResult(data);
    setIsLoading(false);
  };

  // TODO: Find if there is a way to avoid calling this useEffect twice
  useEffect(() => {
    getAllProducts();
  }, []);

  const isPopupOpen = isDeletingProduct;

  if (isLoading) return <Loading />;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <List<IProduct>
            items={productsResult}
            onEdit={(item) => {
              setSelectedItem(item as IProduct);
              setIsUpdatingProduct(true);
            }}
            onDelete={(item) => {
              setSelectedItem(item as IProduct);
              setIsDeletingProduct(true);
            }}
            renderItem={(item, onEdit, onDelete) => {
              const productAttributes = extractProductAttributes(
                item as IProduct
              );
              return (
                <Item
                  item={item}
                  title={productAttributes.title}
                  body={productAttributes.body}
                  footer={productAttributes.footer}
                  status={productAttributes.status}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
          <Home
            show={!isUpdatingProduct && !isCreatingProduct}
            icon={productsResult.length > 0 ? faBasketShopping : undefined}
            title="Productos"
            subtitle={
              productsResult.length > 0
                ? "Lista de productos"
                : "No existen productos creados"
            }
            description={
              productsResult.length > 0
                ? "Puede editar o eliminar cualquier producto de la lista."
                : "Cree un producto para comenzar."
            }
            buttonText="Crear producto"
            onClick={() => setIsCreatingProduct(true)}
          />
          <CreateOrUpdateProduct
            show={isCreatingProduct || isUpdatingProduct}
            onCancel={() => {
              setIsUpdatingProduct(false);
              setIsCreatingProduct(false);
              setSelectedItem(undefined);
            }}
            product={selectedItem}
          />
        </div>
      </Layout>
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmDeletePopup
            show={isDeletingProduct}
            onDelete={() => {}}
            onCancel={() => setIsDeletingProduct(false)}
            messageTitle={`¿Está seguro que desea eliminar el producto seleccionado (id=${selectedItem?.id})?`}
          />
        </div>
      )}
    </>
  );
}
