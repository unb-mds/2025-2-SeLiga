import React, { useState } from "react";

export const Tabs = ({ defaultValue, children, className }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    const childrenArray = React.Children.toArray(children);
    const tabs  = childrenArray.find(child => child.type === TabsList);
    const content = childrenArray.filter(child => child.type === TabsContent);

    return (
        <div className={className}>
            {tabs && React.cloneElement(tabs, { activeTab, setActiveTab })}
            {content.find(c => c.props.value === activeTab)}
        </div>
    );
};

export const TabsList = ({ activeTab, setActiveTab, children, className }) => (
    <div className={`flex bg-gray-100 rounded-lg p-1 mb-6 ${className}`}>
        {React.Children.map(children, child =>
            React.cloneElement(child, { activeTab, setActiveTab, key: child.props.value })
        )}
    </div>
);


export const TabsTrigger = ({ activeTab, setActiveTab, value, children, className }) => (
    <button
        onClick={() => setActiveTab(value)}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === value
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:text-indigo-700'
        } ${className}`}
    >
        {children}
    </button>
);

export const TabsContent = ({ children, value }) => <div>{children}</div>;