'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface ViewButtonProps {
  onClick: VoidFunction;
}

export default function ViewButton({ onClick }: ViewButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
}