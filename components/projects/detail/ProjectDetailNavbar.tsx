import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { FiSettings, FiFile } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { ProjectStatus } from '@/types/projects';

interface ProjectDetailNavbarProps {}

const ProjectDetailNavbar: React.FC<ProjectDetailNavbarProps> = () => {
  const selectedProject = useSelector(selectSelectedProject);
  const projectId = selectedProject?.id;
  const projectStatus = selectedProject?.status;

  const pathname = usePathname();

  const isDraft = projectStatus === ProjectStatus.DRAFT;

  // Navigation items on the left side
  const navigation = [
    { name: 'Summary', href: `/projects/${projectId}` },
    { name: 'Emotions', href: `/projects/${projectId}/emotions` },
    { name: 'Keywords', href: `/projects/${projectId}/grammar` },
    { name: 'Speakers', href: `/projects/${projectId}/speakers` },
    { name: 'Ali', href: `/projects/${projectId}/ali` },
  ];

  // Action items on the right side (with icons)
  const actions = [
    {
      name: 'Deliverables',
      href: `/projects/${projectId}/deliverables`,
      icon: FiFile,
    },
    {
      name: 'Configuration',
      href: `/projects/${projectId}/configuration`,
      icon: FiSettings,
    },
  ];

  return (
    <Disclosure as="nav" className="border-b bg-gray-50">
      <div className="my-1">
        <div className="relative flex items-center justify-between">
          {/* Left-side navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = item.name === 'Summary'
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                  // Hide the button if it's disabled in draft mode
                  if (isDraft && item.name !== 'Configuration') {
                    return null;
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm ${
                        isActive ? 'text-primary' : 'text-slate-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right-side action links */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {actions.map((action) => {
              const isActive = pathname.startsWith(action.href);

              // Hide the button if it's disabled in draft mode
              if (isDraft && action.name !== 'Configuration') {
                return null;
              }

              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className={`px-4 py-2 rounded-lg text-sm flex justify-center items-center ${
                    isActive ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  <action.icon className="w-5 h-5 mr-2" />
                  {action.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default ProjectDetailNavbar;
