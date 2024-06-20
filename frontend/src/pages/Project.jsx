import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { CreateTask } from '../components/CreateTask';
import { TaskItem } from '../components/TaskItem';

import { getTasks } from '../services/tasks.service';
import { getProject } from '../services/projects.service';


export const ProjectPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const getTasksAsync = async () => {
    try {
      const { data } = await getTasks(id);
      setTasks(data.results);
    } catch (error) {
      console.error(error.message);
      setApiError("Erro ao carregar tarefas. Tente novamente mais tarde");
    }
  };

  const getProjectAsync = async () => {
    try {
      const { data } = await getProject(id);
      setProject(data);
    } catch (error) {
      console.error(error.message);
      setApiError("Erro ao carregar projeto. Tente novamente mais tarde");
    }
  };

  const requisicoesPreRender = async () => {
    await Promise.all([getProjectAsync(), getTasksAsync()]).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    requisicoesPreRender();
  }, []);


  return (
    <main className='flex flex-col p-8  min-h-dvh text-gray-700'>
      {isLoading ? (
        <p>Carregando...</p>
      ) : null}

      {apiError && !isLoading ? (
        <p>{apiError}</p>
      ) : null}

      {!apiError && !isLoading ? (
        <>
          <h1 className='text-center text-orange-400 text-2xl font-semibold mb-8'>{project.name}</h1>

          <p>{project.description}</p>

          <div className='flex w-full items-center justify-between my-8 '>
            <p>Tarefas: <strong>{tasks.length}</strong></p>

            <CreateTask refreshTasks={getTasksAsync} projectId={id} className='border border-orange-400 py-3 px-4 rounded-md hover:bg-orange-400 transition-colors flex items-center gap-2'>
              <PlusIcon />
              Nova tarefa
            </CreateTask>
          </div>
        </>
      ) : null}

      {!apiError && !isLoading && tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada</p>
      ) : null}

      {!apiError && !isLoading && tasks.length > 0 ? (
        <ul className='grid gap-2 mt-8'>
          {tasks.map((item) => (
            <TaskItem key={item._id} taskId={item._id} title={item.title} description={item.description} status={item.status} refreshTasks={getTasksAsync} />
          ))}
        </ul>
      ) : null}
    </main>
  )
}
