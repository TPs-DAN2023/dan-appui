"use client";

import { Layout, CreateOrder, Loading, CartProducts } from "@/components";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces";

export default function Carrito() {
  const [stockAndProductArray, setStockAndProductArray] = useState<
    { product: IProduct; selectedStock: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllPedidos = async () => {
    // Get products from localStorage cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setStockAndProductArray(cart);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllPedidos();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px] flex">
        <div className="bg-green-400 flex-grow justify-center items-center flex">
          Publicidad
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        <CartProducts selectedStockAndProductArray={stockAndProductArray} />
        {/* <CreateOrder
            show={!selectedItem && isCreatingOrder}
            onCancel={() => {
              setIsCreatingOrder(false);
              setSelectedItem(undefined);
            }}
          /> */}
      </div>
    </Layout>
  );
}
