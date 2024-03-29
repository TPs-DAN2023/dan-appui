"use client";

interface IconButtonProps {
  onClick: VoidFunction;
  children: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

export default function IconButton({
  onClick,
  children,
  label,
  disabled,
}: IconButtonProps) {
  return (
    <article className="flex flex-col justify-center">
      <button
        className={`rounded-3xl items-center flex justify-center ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:scale-125 hover:opacity-100 transition-all  "
        }`}
        onClick={() => onClick()}
        disabled={disabled}
      >
        {children}
      </button>
      {label && <label htmlFor="from">{label}</label>}
    </article>
  );
}
