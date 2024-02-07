export default function Header() {
  // const router = useRouter();

return (
    <>
      <hr className="w-full border-t-2" />

      {/** Drawer */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow">
        <button
          className="w-full flex items-center border-b px-4 py-2"
          onClick={() => {
            // router.push(ROUTES.HOME);
          }}
        >
          Listado de pedidos
        </button>
        <button
          className="w-full flex items-center border-b px-4 py-2"
          onClick={() => {
            console.log("Crear Pedido");
          }}
        >
          Crear Pedido
        </button>
      </div>
    </>
  );
}

// const DrawerButton = ({ text, onClick }) => (
//   <Button
//     isFullWidth
//     justifyContent="flex-start"
//     onClick={onClick}
//     rounded={0}
//     borderBottomWidth={1}
//     leftIcon={<ChevronRightIcon />}
//   >
//     {text}
//   </Button>
// );