import { useState } from 'react';
import { PenIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { formatDate } from "../lib/utils";
import { CreateProject } from './CreateProject';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

import { deleteProject } from '../services/projects.service';


export const ProjectItem = ({ item, getProjects, ...rest }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      console.log("chegou delete id: ", id);
      getProjects();
      alert("Projeto deletado com sucesso!");
    } catch (error) {
      console.error(error.message);
      alert("Erro ao deletar projeto. Tente novamente mais tarde");
    }
  };

  return (
    <li data-id={item._id} className='group w-full border rounded-lg p-3 shadow text-gray-500 flex flex-col gap-2' {...rest}>
      <div className='flex items-center justify-between'>
        <Link to={`/projects/${item._id}`}>
          <h4 className='text-gray-700 font-semibold text-lg'>{item.name}</h4>
        </Link>

        <div className='flex items-center gap-2 transition-opacity opacity-0 group-hover:opacity-100'>

          <CreateProject refreshProjects={getProjects} isEditing id={item._id} name={item.name} description={item.description} type="button" title='Editar Projeto'>
            <PenIcon size={20} />
          </CreateProject>
          
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onConfirm={() => handleDeleteProject(item._id)}
            setIsOpen={setIsDeleteModalOpen}
            itemName={item.name}
          >
            <button
              type="button"
              title='Deletar Projeto'
              className='text-red-400 hover:text-red-500 transition-colors'
            >
              <TrashIcon size={20} />
            </button>
          </DeleteConfirmationModal>
        </div>
      </div>

      <p className='text-sm line-clamp-3'>{item.description}</p>

      <span className='ml-auto text-sm'>Criado em: {formatDate(item.createdAt)}</span>
    </li>
  )
}
