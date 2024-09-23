import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface NavItemProps {
  label: string;
  icon: React.ComponentType<any>;
  url: string;
  external?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, url, external }) => {
  const pathname = usePathname();
  const isSelected = pathname === url;

  // State for showing/hiding tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center">
      <Link
        key={label}
        className={`flex items-center gap-[12px] px-3 py-2 rounded-lg hover:bg-purple-100 w-full hover:text-primary text-sm ${
          isSelected ? 'bg-purple-100 text-primary' : ''
        }`}
        href={url}
        target={external ? '_blank' : undefined}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon size={18} />
      </Link>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute left-full ml-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm z-10 transition-opacity duration-300 opacity-100"
          role="tooltip"
        >
          {label}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default NavItem;