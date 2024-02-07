// import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ROUTES } from "../../constants";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  onMobileBackPressed: VoidFunction;
  isBackVisible: boolean;
}

export default function NavBar ({ onMobileBackPressed, isBackVisible }: NavBarProps) {

  return (
    <>
      <div className="bg-yellow-500 flex w-full justify-between p-2 md:p-4 items-center">
        <div className="flex items-center">
          {isBackVisible ? (
            <button
              aria-label="Volver"
              className="rounded-3xl"
              onClick={() => onMobileBackPressed()}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="" />
            </button>
          ) : (
            <button
              aria-label="Menu"
              className="rounded-3xl"
              // onClick={onOpen}
            >
              <FontAwesomeIcon icon={faShop} className="" />
            </button>
          )}
          <h1 className="pl-4">Marketplace</h1>
        </div>
        <div className="flex items-center">
          {/* <Image
            src="https://url.que.no.existe"
            alt="Avatar"
            className="w-8 h-8 mr-2"
            width="40"
            height={40}
          /> */}
          <Link href="/">
            <button
              className="text-sm text-red-500 border border-red-500 rounded px-2 py-1"
              onClick={() => {
                // router.push(ROUTES.LOGIN);
              }}
            >
              Salir
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}