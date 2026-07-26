import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 transform active:scale-[0.97] outline-none";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-sm",
    secondary: "bg-surface hover:bg-surface-hover text-text-main border border-border",
    danger: "bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20",
    outline: "border border-primary/50 hover:border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent hover:bg-surface-hover text-text-muted hover:text-text-main"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base w-full",
    icon: "p-2"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
