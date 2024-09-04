import React, { useState } from "react";

interface TabLink {
  name: string;
  href: string;
  disabled?: boolean;
}

interface TabLinksProps {
  tabs: TabLink[];
  defaultActiveTab?: string;
}

const TabLinks: React.FC<TabLinksProps> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].name);

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab, index) => (
        <li key={index} className="me-2">
          <a
            href={tab.disabled ? "#" : tab.href}
            aria-current={activeTab === tab.name ? "page" : undefined}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === tab.name
                ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            } ${tab.disabled ? "text-gray-400 cursor-not-allowed dark:text-gray-500" : ""}`}
            onClick={(e) => {
              if (!tab.disabled) {
                e.preventDefault();
                setActiveTab(tab.name);
              }
            }}
          >
            {tab.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TabLinks;