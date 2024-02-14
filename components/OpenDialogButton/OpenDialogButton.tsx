interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
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
      className={`text-blue-500 p-2 m-2 rounded hover:text-blue-700 hover:bg-blue-100 transition-all ease-in-out duration-300 ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
