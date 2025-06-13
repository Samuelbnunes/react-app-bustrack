import "./button.css";

export const Button = ({ children, onClick, type = "button", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className="button"
    {...props}
  >
    {children}
  </button>
);