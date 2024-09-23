import { RequireAuth } from '@/components/utils';
import Sidebar from '@/components/sidebar/Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  mainClassName?: string; // Add a prop for the CSS classes
}

export default function SidebarLayout({ children, mainClassName }: SidebarLayoutProps) {
  return (
    <RequireAuth>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className={`flex flex-col flex-grow bg-[#F5F6F7] ${mainClassName}`}>
          <main className={`flex-grow px-4 pt-4 w-full mx-auto h-screen`}>{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
