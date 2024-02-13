import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface ClearButtonProps {
  onClick: VoidFunction;
}

export default function ClearButton ({ onClick }: ClearButtonProps) {
  return (
    <button
      className="rounded-3xl self-end hover:scale-125 hover:opacity-100 transition-all"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faTimesCircle} />
    </button>
  );
}
