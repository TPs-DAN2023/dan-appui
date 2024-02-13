'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface EditButtonProps {
  onClick: VoidFunction;
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}