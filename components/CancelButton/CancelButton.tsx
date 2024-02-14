interface CancelButtonProps {
  children: React.ReactNode;
  onClick?: (args?: any) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function CancelButton({
  children,
  onClick,
  type,
  className,
  disabled,
}: CancelButtonProps) {
  return (
    <button
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all ease-in-out duration-300 ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
