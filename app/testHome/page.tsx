'use client'

import { SetStateAction, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { getPedidos } from "../../api";
import { Loading, Header, OrderList, OrderDetails } from '../../components'
import NavBar from "@/components/NavBar/NavBar";

const Home = () => {
  const myId = 1; // Ideally, this should be retrieved with the actual user ID
  const [selected, setSelected] = useState(null);
  const hasProductSelected = selected;
  const isSmallScreen = false;
  // const isLoading = false;
  // const error = null;
  // const data = async () => await getPedidos(myId);
  // console.log('data', data)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPedidos(myId);
        setData(result);
      } catch (error: unknown) {
        setError(error as SetStateAction<null>);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [myId]);
  // const isSmallScreen = useSmallScreenDetector();

  if (isLoading) return <Loading />;

  if (error) return "Something went wrong: " + error;

  const isBackVisible = isSmallScreen && hasProductSelected;
  const isListVisible = !isSmallScreen || (isSmallScreen && !isBackVisible);
  const isDetailVisible = !isSmallScreen || isBackVisible;

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-2">
        <NavBar           
          onMobileBackPressed={() => setSelected(null)}
          isBackVisible={isBackVisible}
        />
        {/* <Header /> */}
      </div>
      {isListVisible && (
        <div className="overflow-x-hidden overflow-y-scroll border-r border-gray-700 col-span-1">
          <OrderList pedidos={data} setSelected={setSelected} />
        </div>
      )}
      {isDetailVisible && (
        <div className="overflow-x-hidden overflow-y-scroll col-span-1 flex">
          <OrderDetails
            pedido={selected}
            isBackVisible={isBackVisible}
            onClearSelectionPressed={() => setSelected(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
