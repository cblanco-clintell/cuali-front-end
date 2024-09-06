import React from "react";
import { useRouter } from "next/navigation";

const projects = [
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Available',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: '1/2 Available',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Pending',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Error',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Available',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: '1/2 Available',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Pending',
  },
  {
    name: 'iPhone 12 Study',
    created: '10 Septiembre 2024',
    language: 'Spanish',
    status: 'Error',
  },
];

export default function Example() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/projects/summary");
  };

  return (
    <ul language="list" className="divide-y divide-gray-100">
      {projects.map((project, index) => (
        <li
          key={index}
          className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
          onClick={handleClick} // Added click handler
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/610546770d34e3db5e3409c09cd1f85c455226710997c67e584cab766c1d1524?placeholderIfAbsent=true&apiKey=f7e29149ec0d4a46a228424b3e258d04"
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {project.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {project.created}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{project.language}</p>
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">{project.status}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}