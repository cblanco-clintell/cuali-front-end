import React from "react";
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

  return (
    <Link
      key={label}
      className={`flex items-center gap-[12px] px-3 py-2 rounded-lg hover:bg-purple-100 w-full hover:text-primary text-sm ${
        isSelected ? 'bg-purple-100 text-primary' : ''
      }`}
      href={url}
      target={external ? '_blank' : undefined}
    >
      <Icon size={18} />
      {/* <span>{label}</span> */}
    </Link>
  );
};

export default NavItem;
