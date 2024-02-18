"use client";

interface IconButtonProps {
  onClick: VoidFunction;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function IconButton({
  onClick,
  children,
  disabled,
}: IconButtonProps) {
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
      {children}
    </button>
  );
}
