import "./logo.css";

export function Logo({ className = "" }) {
  return (
    <img
      src='#'
      alt='Logo'
      width={96}
      height={96}
      className={`w-24 h-24 mb-4 ${className}`}
      draggable={false}
    />
  );
}