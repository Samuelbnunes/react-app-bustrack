import './input.css';

export const Input = ({ label, value, onChange, type = "text", placeholder = "", ...props }) => (
  <div>
    {label && <label>{label}</label>}
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  </div>
);