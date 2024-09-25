import { ProjectCard } from './ProjectCard';

const ProjectCardList = ({ projects }: { projects: any[] }) => {
  return (
    <div className="grid grid-cols-5 gap-4 2xl:grid-cols-5">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectCardList;