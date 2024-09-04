"use client";
import React from "react";
import Profile from "./Profile";
import { FiHome, FiFolder, FiUsers, FiLifeBuoy, FiSettings, FiPhone, FiPhoneForwarded, FiMessageSquare } from "react-icons/fi";
import NavItem from "./NavItem";

const menuItemsTop = [
  { label: 'Home', icon: FiHome, url: '/' },
  { label: 'Ask Ali', icon: FiUsers, url: '/ali' },
  { label: 'My Studies', icon: FiFolder, url: '/studies' },
  { label: 'Deliverables', icon: FiFolder, url: '/deliverables' },
];

const menuItemsBottom = [
  { label: 'Soporte', icon: FiLifeBuoy, url: 'mailto:info@cuali.ai' },
  { label: 'Configuración', icon: FiSettings, url: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 border-r border-gray-200 h-screen flex flex-col justify-between" id="sidenav">
      <div>
        <header className="flex flex-col pt-8">
          <div className="flex flex-col justify-center items-start pr-5 pl-6">
            <div className="flex justify-center items-center max-w-full w-[142px]">
              <img src="/logo.svg" alt="Logo" className="w-24 h-auto" />
            </div>
          </div>
          <nav className="flex flex-col px-4 mt-6 text-base leading-6 whitespace-nowrap text-slate-700">
            {menuItemsTop.map((item) => (
              <NavItem key={item.label} label={item.label} icon={item.icon} url={item.url} />
            ))}
          </nav>
        </header>
      </div>
      <div className="px-4 pb-4">
        {menuItemsBottom.map((item) => (
          <NavItem key={item.label} label={item.label} icon={item.icon} url={item.url} />
        ))}
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
