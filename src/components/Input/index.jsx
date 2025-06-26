import './input.css';

export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  labelClassName = "",
  ...props
}) => (
  <div>
    {label && <label className={labelClassName}>{label}</label>}
    <input
      className={`input ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  </div>
);