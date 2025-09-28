import React from "react";

export const Card = ({ children, className }) => (
    <div className={`bh-white rounded-x1 shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className }) => <div className={`p-5 pb-3 $(className)`}>{children}</div>;

export const CardTitle = ({ children, className }) => <h3 className={`text-x1 font-bold text-gray-800 ${className}`}>{children}</h3>;

export const CardContent = ({ children, className }) => <div className={`p-5 pt-0 ${className}`}>{children}</div>;