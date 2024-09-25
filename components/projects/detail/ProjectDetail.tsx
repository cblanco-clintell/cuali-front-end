import React from 'react';
import { useGetProjectQuery } from '@/redux/features/projects/projectApiSlice';
import Header from '@/components/header/Header';
import ProjectDetailNavbar from './ProjectDetailNavbar';
import { FiChevronLeft, FiFolder } from 'react-icons/fi';


interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
  const [selectedObjective, setSelectedObjective] = React.useState<{ index: number | null, text: string | null }>({
    index: null,
    text: null,
  });

  if (isLoading) return <div>Loading project data...</div>;
  if (isError) return <div>Error loading project data...</div>;

  const breadcrumbs = [
    { icon: FiChevronLeft, title: 'Studies', href: '/projects' }, 
    { icon: FiFolder, title: project.name, href: `/projects/${projectId}` }
  ];

  const handleObjectiveChange = (index: number, text: string) => {
    setSelectedObjective({ index, text });
  };

  return (
    <div className="projects">
      <Header breadcrumbs={breadcrumbs} />
      <ProjectDetailNavbar projectId={projectId} />
      {/* This section is what needs to change based on the section of the project they are, the "home or summary", emotions, keywords, etc */}
    </div>
  );
};

export default ProjectDetail;