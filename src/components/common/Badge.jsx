function Badge({ children, variant = "new" }) {

  const variants = {
    new: "bg-blue-600 text-white",
    discount: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default Badge;