import React from 'react';
import { IconType } from 'react-icons';
import Link from "next/link";

interface BreadcrumbProps {
  icon?: IconType | null;
  title: string;
  href?: string | null;
}

interface CreditProps {
  amount: number;
  color: string;
}

interface UserAvatarProps {
  src: string;
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbProps[]; // Optional array of breadcrumbs
}

const Credit: React.FC<CreditProps> = ({ amount, color }) => (
  <div className="flex gap-2 items-center text-xs font-semibold text-slate-700">
    <div className={`w-3 h-3 ${color} rounded-full`} />
    <span>{amount} credits</span>
  </div>
);

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => (
  <div className="w-10 h-10">
    <img
      loading="lazy"
      src={src}
      alt="User avatar"
      className="object-cover w-full h-full rounded-full"
    />
  </div>
);

const Header: React.FC<HeaderProps> = ({ breadcrumbs = [{ icon: null, title: 'None' }] }) => {
  return (
    <header className="flex justify-between items-center px-8 py-2 border-b">
      {/* Left side: Breadcrumbs */}
      <div className="flex gap-4 items-center">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((breadcrumb, index) => (
            <Link key={index} className="flex items-center gap-2 text-sm font-medium text-slate-600" href={breadcrumb.href || ''}>
              {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
              <span>{breadcrumb.title}</span>
            </Link>
          ))
        ) : (
          <span className="text-base text-gray-500"></span>
        )}
      </div>

      {/* Right side: Updates, Credit, and Avatar */}
      <div className="flex gap-6 items-center">
        {/* Updates Button */}
        {/* <button className="px-4 py-2">Updates</button> */}

        {/* Credit Counter */}
        <Credit amount={120} color="bg-lime-300" />

        {/* User Avatar */}
        <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5801b2d62176613f944407e739c1e9c398bcff4dd3c311aac2dadfc6f7a6c30?placeholderIfAbsent=true&apiKey=f7e29149ec0d4a46a228424b3e258d04" />
      </div>
    </header>
  );
};

export default Header;