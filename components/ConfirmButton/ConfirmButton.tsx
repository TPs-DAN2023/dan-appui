interface ButtonProps {
  children: React.ReactNode;
  onClick?: (arg?: any) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded transition-all ease-in-out duration-300 ${className} ${
        disabled
          ? "bg-gray-500 opacity-50 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
