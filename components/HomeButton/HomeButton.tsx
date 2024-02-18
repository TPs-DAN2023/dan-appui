"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

interface HomeButtonProps {
  onClick: VoidFunction;
}

export default function HomeButton({ onClick }: HomeButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faShop} className="w-6 h-6" />
    </button>
  );
}
