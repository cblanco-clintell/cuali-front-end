import ProjectCardList from '@/components/projects/ProjectCardList';
import { useGetProjectsQuery } from '@/redux/features/projects/projectApiSlice';
import Header from '@/components/header/Header';

export const Projects = () => {
  const { data: projects, isLoading: projectsIsLoading, isError: projectsIsError } = useGetProjectsQuery({});
  return (
    <div className="projects">
      <Header/>
      <div>
        <h1 className="text-gray-900 text-3xl font-semibold leading-9">Studies</h1>
      </div>
      <ProjectCardList projects={projects}/>
    </div>
  );
};

export default Projects;