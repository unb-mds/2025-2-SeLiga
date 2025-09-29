import React from "react";

export const Badge = ({ children, variant = 'default', className }) => {
    let color = "bg-gray-100 text-gray-600 border border-gray-200";
    if (variant === 'outline') {
         color = "bg-gray-50 text-gray-500 border border-gray-200";
    } else if (variant === 'verified') {                                // se a notícia for verificada, badge fica verde
        color = "bg-green-100 text-green-700 font-medium";
    } else if (variant === 'unverified') {                              // se não for verificada, badge fica amarela
        color = "bg-yellow-100 text-yellow-700 font-medium";
   /* } else if (variant === 'false') {                                   // se for falsa, badge fica vermelha
        color = "bg-red-100 text-red-700 font-medium";
    */}
    return (
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
            {children}
        </span>
    );
};