"use client";

import {
  List,
  ProductDetails,
  Layout,
  Home,
  Item,
  Loading,
  ConfirmDeletePopup,
} from "@/components";
import { useEffect, useState } from "react";
import { getProductsMock } from "../../mocks";
import CreateProduct from "@/components/CreateProduct/CreateProduct";
import { extractProductAttributes } from "@/utils";
import { IProduct } from "@/interfaces";

export default function Productos() {
  const [productsResult, setProductsResult] = useState<IProduct[]>([]);
  const [selectedItemToUpdate, setSelectedItem] = useState<IProduct>();
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    setIsLoading(true);
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

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List<IProduct>
          items={productsResult}
          onEdit={(item) => setSelectedItem(item as IProduct)}
          onDelete={() => setIsDeletingProduct(true)}
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
          show={!selectedItemToUpdate && !isCreatingProduct}
          title="Productos"
          subtitle="No hay ningún producto seleccionado"
          description="Seleccione un producto de la lista para visualizar el detalle del mismo."
          buttonText="Crear producto"
          onClick={() => setIsCreatingProduct(true)}
        />
        <CreateProduct
          show={!!selectedItemToUpdate || isCreatingProduct}
          onCancel={() => {
            setSelectedItem(undefined);
            setIsCreatingProduct(false);
          }}
          product={selectedItemToUpdate}
        />
        <ConfirmDeletePopup
          show={isDeletingProduct}
          onDelete={() => {}}
          onCancel={() => setIsDeletingProduct(false)}
          message={`¿Está seguro que desea eliminar el producto seleccionado (id=${selectedItemToUpdate?.id})?`}
        />
      </div>
    </Layout>
  );
}
