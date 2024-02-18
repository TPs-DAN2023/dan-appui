import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface AddToCartButtonProps {
  onClick: VoidFunction;
}

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faCartPlus} color="green" />
    </button>
  );
}
