import React from "react";

export const Button = ({ onClick, disabled, className, children, variant = 'default' }) => {
    let baseStyle = "px-4 py-2 font-semibold rounded-lg transition-colors duration-200 shadow-md";
    let variantStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
    if (variant === 'outline') {
        variantStyle = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100";
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled} // ✅ CORREÇÃO AQUI (estava escrito 'discabled')
            className={`${baseStyle} ${variantStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};
