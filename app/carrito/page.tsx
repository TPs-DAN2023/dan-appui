"use client";

import {
  Layout,
  CreateOrder,
  Loading,
  CartProducts,
  EmptyCart,
} from "@/components";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { withAuth } from "@/hocs";

function Carrito() {
  const [stockAndProductArray, setStockAndProductArray] = useState<
    { product: IProduct; selectedStock: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const getProductsToBuy = async () => {
    // Get products from localStorage cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setStockAndProductArray(cart);
    console.log("cart", cart);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsToBuy();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[300px] flex">
        <div className="bg-green-400 flex-grow justify-center items-center flex">
          Publicidad
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
        {stockAndProductArray && stockAndProductArray.length > 0 ? (
          <CartProducts
            show={!isCreatingOrder}
            selectedStockAndProductArray={stockAndProductArray}
            onClick={() => setIsCreatingOrder(true)}
          />
        ) : (
          <EmptyCart />
        )}
        <CreateOrder
          show={isCreatingOrder}
          onCancel={() => setIsCreatingOrder(false)}
        />
      </div>
    </Layout>
  );
}

export default withAuth(Carrito);
