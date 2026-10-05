function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  onClick, 
  type = "button",
  disabled = false,
  className = ""
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-gray-300 text-dark hover:bg-gray-bg",
    ghost: "text-dark hover:bg-gray-bg",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;