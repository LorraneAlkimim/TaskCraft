import { useState } from 'react';
import { PenIcon, TrashIcon } from 'lucide-react';

import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { CreateTask } from './CreateTask';

import { deleteTask, editTask } from '../services/tasks.service';


export const TaskItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      props.refreshTasks();
      alert("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error(error.message);
      alert("Erro ao deletar tarefa. Tente novamente mais tarde");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      const status = e.target.checked ? 'concluída' : 'pendente';
      const payload = {
        title: props.title,
        description: props.description,
        status,
      }
      await editTask(props.taskId, payload);
      props.refreshTasks();
    } catch (error) {
      console.error(error.message);
      alert("Erro ao alterar status da tarefa. Tente novamente mais tarde");
    }
  };

  return (
    <li>
      <label htmlFor={props.taskId} className='group has-[:checked]:text-gray-300 has-[:checked]:line-through flex items-center gap-x-2 border rounded-lg py-3 px-4 cursor-pointer hover:border-gray-500 hover:text-gray-500 transition-colors'>
        <div className='flex items-center gap-2 w-full'>
          <input type="checkbox" id={props.taskId} checked={props.status === "concluída"} onChange={handleStatusChange} />

          <div className='w-full'>
            <span className='font-semibold'>{props.title}</span>
            <p className='text-xs mt-1 w-full'>{props.description}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 transition-opacity opacity-0 group-hover:opacity-100'>
          <CreateTask
            isEditing
            taskId={props.taskId}
            description={props.description}
            name={props.title}
            refreshTasks={props.refreshTasks}
            title='Editar Projeto'
          >
            <PenIcon size={20} />
          </CreateTask>

          <DeleteConfirmationModal
            isOpen={isOpen}
            onConfirm={() => handleDeleteTask(props.taskId)}
            setIsOpen={setIsOpen}
            itemName={props.title}
          >
            <button type="button" title='Deletar Projeto' className='text-red-400 hover:text-red-500 transition-colors'>
              <TrashIcon size={20} />
            </button>
          </DeleteConfirmationModal>
        </div>
      </label>
    </li>
  )
}
