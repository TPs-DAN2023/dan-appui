interface FormInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  min?: string;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  className,
  disabled,
  min,
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`border-2 border-gray-300 p-2 m-2 ${className}`}
        disabled={disabled}
        min={min}
      />
    </div>
  );
}
