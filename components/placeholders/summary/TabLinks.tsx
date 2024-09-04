import React, { useState } from "react";
import Link from "next/link";


interface TabLinksProps {
  defaultActiveTab?: string;
}

const TabLinks: React.FC<TabLinksProps> = ({ defaultActiveTab }) => {
  const tabs = [
    { name: "Summary", href: "/projects/summary" },
    { name: "Emotions", href: "/projects/emotions" },
    { name: "Keywords", href: "/projects/emotions" },
    { name: "Speakers", href: "/projects/emotions" },
    { name: "Deliverables", href: "/projects/deliverables" },
    { name: "Config", href: "/projects/config" },
  ];
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].name);


  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab, index) => (
        <li key={index} className="me-2">
          <Link href={tab.href}>
            <span
              className={`inline-block p-4 rounded-t-lg cursor-pointer ${
                activeTab === tab.name
                  ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              } ${tab.disabled ? "text-gray-400 cursor-not-allowed dark:text-gray-500" : ""}`}
            >
              {tab.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TabLinks;