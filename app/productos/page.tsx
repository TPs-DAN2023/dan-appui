"use client";

import { List, ProductDetails, Layout, Home, Item } from "@/components";
import { useEffect, useState } from "react";
import { getProductsMock } from "../../api";
import CreateProduct from "@/components/CreateProduct/CreateProduct";
import { extractProductAttributes } from "@/utils";
import { IProduct } from "@/interfaces";

export default function Productos() {
  const [productsResult, setProductsResult] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // useEffect(() => {
  //   console.log(selectedItem)
  // }, [selectedItem]);

  const getAllProducts = async () => {
    // Fetch data from external API
    const res = await fetch("http://localhost/api/productos");
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }
    // console.log(data);
    setProductsResult(data);
  };

  // function renderProductHome() {
  //   if (!selectedItem) {
  //     return (
  //       <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
  //         <ProductHome />
  //       </div>
  //     );
  // }

  // return null;
  // }

  // function renderProductDetails() {

  //   if (selectedItem) {
  //     return (
  //       <div className="overflow-x-hidden overflow-y-scroll justify-center items-center flex flex-grow">
  //         <ProductDetails
  //           product={selectedItem}
  //           onClearSelectionPressed={() => setSelectedItem(null)}
  //         />
  //       </div>
  //     )
  //   }

  //   return null;
  // }

  return (
    <Layout>
      {/* <section className="h-screen flex flex-col"> */}
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
        <List items={getProductsMock(1)} onClick={setSelectedItem}>
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
          onCancel={() => setIsCreatingProduct(false)}
        />
      </div>
      {/* </section> */}
    </Layout>
  );
}
