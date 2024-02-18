import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface AddToCartButtonProps {
  onClick: VoidFunction;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  disabled,
}: AddToCartButtonProps) {
  return (
    <button
      className={`rounded-3xl self-end ${
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:scale-125 hover:opacity-100 transition-all  "
      }`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faCartPlus} color={disabled ? "gray" : "green"} />
    </button>
  );
}
