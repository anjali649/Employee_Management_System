import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  id, 
  ...props 
}, ref) => {
  const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-text-muted text-[11px] font-semibold tracking-wider uppercase mb-2"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full bg-surface border rounded-md px-4 py-3 text-text-main text-sm outline-none transition-all duration-200 placeholder:text-text-muted focus:bg-primary/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 ${error ? 'border-danger/50 focus:border-danger focus:ring-danger/50' : 'border-border hover:border-text-muted'}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-[11px] text-danger font-medium animate-fade-in">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
