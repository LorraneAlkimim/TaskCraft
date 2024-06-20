import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { CreateProject } from '../components/CreateProject';
import { ProjectItem } from '../components/ProjectItem';

import { getProjects } from '../services/projects.service';


export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    getProjectsAsync();
  }, []);

  const getProjectsAsync = async () => {
    setIsLoading(true)
    try {
      const { data } = await getProjects();
      setProjects(data.results);
    } catch (error) {
      console.error(error.message);
      setApiError("Erro ao carregar projetos. Tente novamente mais tarde");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <main className='flex flex-col px-2 py-8 min-h-dvh'>
      <h1 className='text-orange-400 text-2xl font-semibold mb-8 text-center'>Meus Projetos</h1>

      {isLoading ? (
        <p>Carregando...</p>
      ) : null}

      {apiError && !isLoading ? (
        <p>{apiError}</p>
      ) : null}

      {!apiError && !isLoading ? (
        <div className='flex w-full items-center justify-between mb-8 '>
          <p>Projetos: <strong>{projects.length}</strong></p>

          <CreateProject refreshProjects={getProjectsAsync} className='border border-orange-400 py-3 px-4 rounded-md hover:bg-orange-400 transition-colors flex items-center gap-2'>
            <PlusIcon />
            Novo projeto
          </CreateProject>
        </div>
      ) : null}

      {!apiError && !isLoading && projects.length === 0 ? (
        <p>Nenhum projeto encontrado</p>
      ) : null}

      {!apiError && !isLoading && projects.length > 0 ? (
        <ul className='grid grid-cols-2 gap-4'>
          {projects.map((project) => (
            <ProjectItem key={project._id} item={project} getProjects={getProjectsAsync} />
          ))}
        </ul>
      ) : null}
    </main>
  )
}
