interface CartButtonProps {
  children: React.ReactNode;
  onClick?: (arg?: any) => void;
  className?: string;
}

export default function CartButton({
  children,
  onClick,
  className,
}: CartButtonProps) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded transition-all ease-in-out duration-300 ${className} bg-green-500 hover:bg-green-700 text-white
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
