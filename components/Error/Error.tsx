import Link from "next/link";
import { ConfirmButton } from "@/components";

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-4xl text-red-500">Error</p>
      <p className="mt-4 text-center">
        Ha ocurrido un error, por favor intenta nuevamente
      </p>
      <p className="mt-4 text-center text-red-500">{message}</p>
      <Link href="/">
        <ConfirmButton>Regresar</ConfirmButton>
      </Link>
    </div>
  );
}
