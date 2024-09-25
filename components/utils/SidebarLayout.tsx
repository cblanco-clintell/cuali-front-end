import { RequireAuth } from '@/components/utils';
import Sidebar from '@/components/sidebar/Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  mainClassName?: string; // Add a prop for the CSS classes
}

export default function SidebarLayout({ children, mainClassName }: SidebarLayoutProps) {
  return (
    <RequireAuth>
      <div className="flex w-full h-screen">
        {/* Sidebar - static, takes up fixed space */}
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>

        {/* Main Content - scrollable */}
        <div className={`flex flex-col flex-grow bg-[#F9FAFB] overflow-y-auto ${mainClassName}`}>
          <main className={`flex-grow w-full mx-auto`}>{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}