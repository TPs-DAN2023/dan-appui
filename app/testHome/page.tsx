'use client'

import { SetStateAction, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { getOrders, getProducts, getUsers } from "../../api";
import { Loading, OrderItem, ProductItem, UserItem, List } from '../../components'
import NavBar from "@/components/NavBar/NavBar";
import { on } from "events";

const Home = () => {

  const [selectedTab, setSelectedTab] = useState('home');

  const myId = 1; // Ideally, this should be retrieved with the actual user ID
  const [selected, setSelected] = useState(null);
  const hasProductSelected = selected;
  const isSmallScreen = false;
  // const isLoading = false;
  // const error = null;
  // const data = async () => await getOrders(myId);
  // console.log('data', data)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('selectedTab', selectedTab)

    const fetchData = async () => {
      try {
        let result;
        setData([]);
        setIsLoading(true);
        switch (selectedTab) {
          case 'home':
            result = null;
            break;
          case 'orders':
            console.log('getOrders')
            result = await getOrders(myId);
            break;
          case 'products':
            console.log('getProducts')
            result = await getProducts(myId);
            break;
          case 'users':
            console.log('getUsers')
            result = await getUsers(myId);
            break;
          default:
            throw new Error('Invalid tab');
        }
        console.log(result);
        setData(result);
      } catch (error: unknown) {
        setError(error as SetStateAction<null>);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [myId, selectedTab]);
  // const isSmallScreen = useSmallScreenDetector();

  if (isLoading) return <Loading />;

  if (error) return "Something went wrong: " + error;

  // const isBackVisible = isSmallScreen && hasProductSelected;
  // const isListVisible = !isSmallScreen || (isSmallScreen && !isBackVisible);
  // const isDetailVisible = !isSmallScreen || isBackVisible;

  return (
    <section className="h-screen flex flex-col">
      <header className="border border-b-blue-700">
        <NavBar
          setSelectedTab={setSelectedTab}
        />
      </header>
      <main className="flex overflow-x-hidden overflow-y-hidden flex-grow">
        { selectedTab === 'home' && 
          <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-4xl font-bold">Bienvenido a Marketplace B2B</h1>
            <p className="text-2xl">Selecciona una opción del menú</p>
          </div>
        }
        { selectedTab === 'orders' &&
          <div className="overflow-x-hidden overflow-y-scroll border-r">
            <List items={data} onClick={() => console.log('Not implemented yet')}>
              {(item, onClick) => <OrderItem order={item} onClick={onClick} />}
            </List>
          </div>
        }
        { selectedTab === 'products' &&
          <div className="overflow-x-hidden overflow-y-scroll border-r">
            <List items={data} onClick={() => console.log('Not implemented yet')}>
              {(item, onClick) => <ProductItem product={item} onClick={onClick} />}
            </List>
          </div>
        }
        { selectedTab === 'users' &&
          <div className="overflow-x-hidden overflow-y-scroll border-r">
            <List items={data} onClick={() => console.log('Not implemented yet')}>
              {(item, onClick) => <UserItem user={item} onClick={onClick} />}
            </List>
          </div>
        }

        {/* {isListVisible && (
          <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
            <h3 className="text-2xl font-semibold text-center uppercase">Lista de pedidos</h3>
            <OrderList pedidos={data} setSelected={setSelected} />
          </div>
        )}
        {isDetailVisible && (
          <div className="overflow-x-hidden overflow-y-scroll flex-grow flex">
            <OrderDetails
              pedido={selected}
              isBackVisible={isBackVisible}
              onClearSelectionPressed={() => setSelected(null)}
            />
          </div>
        )} */}
      </main>
    </section>
  );
};

export default Home;
