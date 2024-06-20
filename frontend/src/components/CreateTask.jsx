
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from './Input';
import { createTask, editTask } from '../services/tasks.service';


const schema = z.object({
  title: z.string().min(1, 'Insira um título para a tarefa'),
  description: z.string().min(1, 'Insira uma descrição para a tarefa')
})

export const CreateTask = ({ name, description, isEditing, taskId, projectId, refreshTasks, ...rest}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    values: {
      title: name,
      description: description,
    }
  })

  const onSubmit = async (payload) => {
    setIsLoading(true);

    try {
      if (isEditing) {
        await editTask(taskId, payload);
      } else {
        await createTask(projectId, payload);
      }
      reset();
      refreshTasks();
      setIsOpen(false);
    } catch (error) {
      console.error(error.message);
      alert("Erro ao criar tarefa. Tente novamente mais tarde");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger {...rest} />

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/10' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-700 border shadow-2xl p-4 rounded-lg w-full max-w-2xl py-9 px-6'>
          <h3 className='text-center text-orange-400 text-2xl font-semibold mb-4'>
            {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <Input label='Título:' errorMessage={errors.title?.message} {...register("title")} />

            <Input multiline label='Descrição:' errorMessage={errors.description?.message} {...register("description")} />

            <div className='flex items-center justify-between mt-4 gap-4'>
              <Dialog.Close onClick={() => reset()} className='flex-1 px-4 py-3 border rounded-lg border-orange-400 hover:bg-orange-500 hover:text-white transition-colors'>Cancelar</Dialog.Close>

              <button type='submit' disabled={isLoading} className='flex-1 px-4 py-3 border rounded-lg border-orange-400 bg-orange-400 text-white hover:bg-orange-500 transition-colors font-semibold'>{isEditing ? 'Editar' : 'Criar'}</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
