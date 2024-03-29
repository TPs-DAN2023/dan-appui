interface FormInputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
}

export default function FormInput({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required,
  className,
  disabled,
  min,
  max,
}: FormInputProps) {
  return (
    <article className="flex flex-col">
      {label && (
        <label htmlFor="from" className="text-medium font-bold ml-2">
          {label}
        </label>
      )}
      <input
        data-format={type === "date" ? "YYYY-MM-DD" : ""}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`border-2 border-gray-300 p-2 m-2 ${className} 
          ${disabled ? "cursor-not-allowed" : ""}`}
        disabled={disabled}
        min={min}
        max={max}
      />
    </article>
  );
}
