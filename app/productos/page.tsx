"use client";

import { List, ProductDetails, Layout, Home, Item } from "@/components";
import { useEffect, useState } from "react";
import { getProductsMock } from "../../mocks";
import CreateProduct from "@/components/CreateProduct/CreateProduct";
import { extractProductAttributes } from "@/utils";
import { IProduct } from "@/interfaces";

export default function Productos() {
  const [productsResult, setProductsResult] = useState<IProduct[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
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

  return (
    <Layout>
      {/* <section className="h-screen flex flex-col"> */}
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando productos...</p>
          </div>
        ) : (
          <List items={productsResult} onClick={setSelectedItem}>
            {/* {(item, onClick) => <ProductItem product={item} onClick={onClick} />} */}
            {(item: IProduct, onClick: any): any => {
              const productAttributes = extractProductAttributes(item);
              return (
                <Item
                  item={item}
                  title={productAttributes.title}
                  body={productAttributes.body}
                  footer={productAttributes.footer}
                  status={productAttributes.status}
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
          show={!selectedItem && !isCreatingProduct}
          title="Productos"
          subtitle="No hay ningún producto seleccionado"
          description="Seleccione un producto de la lista para visualizar el detalle del mismo."
          buttonText="Crear producto"
          onClick={() => setIsCreatingProduct(true)}
        />
        <ProductDetails
          show={!!selectedItem}
          product={selectedItem}
          onClearSelectionPressed={() => setSelectedItem(null)}
        />
        <CreateProduct
          show={!selectedItem && isCreatingProduct}
          // onCancel={() => setIsCreatingProduct(false)}
          onCancel={() => {}}
        />
      </div>
      {/* </section> */}
    </Layout>
  );
}
