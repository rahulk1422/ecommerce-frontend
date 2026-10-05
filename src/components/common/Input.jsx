function Input({ label, required = false, error, type = "text", placeholder, value, onChange }) {

  return (
    <div className="mb-4">
      
      {label && (
        <label className="block text-sm font-medium text-dark mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {error && (
        <p className="text-sm text-danger mt-1">{error}</p>
      )}

    </div>
  );
}

export default Input;