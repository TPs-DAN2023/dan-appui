interface ButtonProps {
  children: React.ReactNode;
  onClick?: (arg?: any) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "orange" | "purple";
}

export default function Button({
  children,
  onClick,
  type,
  className,
  disabled,
  color = "blue",
}: ButtonProps) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded transition-all ease-in-out duration-300 text-white ${className} ${
        disabled
          ? "bg-gray-500 opacity-50 cursor-not-allowed text-black"
          : color === "blue"
          ? "bg-blue-500 hover:bg-blue-700"
          : color === "green"
          ? "bg-green-500 hover:bg-green-700"
          : color === "red"
          ? "bg-red-500 hover:bg-red-700"
          : color === "yellow"
          ? "bg-yellow-500 hover:bg-yellow-700"
          : color === "gray"
          ? "bg-gray-500 hover:bg-gray-700"
          : color === "orange"
          ? "bg-orange-500 hover:bg-orange-700"
          : color === "purple"
          ? "bg-purple-500 hover:bg-purple-700"
          : `bg-${color}-500 hover:bg-${color}-700`
      }`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
