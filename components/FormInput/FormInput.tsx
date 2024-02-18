interface FormInputProps {
  type?: string;
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
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`border-2 border-gray-300 p-2 m-2 ${className}`}
      disabled={disabled}
      min={min}
      max={max}
    />
  );
}
