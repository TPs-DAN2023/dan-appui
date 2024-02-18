import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

interface RemoveFromCartButtonProps {
  onClick: VoidFunction;
}

export default function RemoveFromCartButton({
  onClick,
}: RemoveFromCartButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faCartArrowDown} color="red" />
    </button>
  );
}
