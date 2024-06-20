import * as Dialog from '@radix-ui/react-dialog';

export const DeleteConfirmationModal = ({ isOpen, onConfirm, setIsOpen, itemName, children }) => {
  const handleConfirm = async () => {
    await onConfirm();
    setIsOpen(false)
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/10' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-700 border shadow-2xl p-4 rounded-lg w-full max-w-md py-9 px-6'>
          <h3 className='text-center text-orange-400 text-2xl font-semibold mb-4'>Confirmação de Exclusão</h3>

          <p className='mt-4'>Tem certeza de que deseja excluir <strong>{itemName}</strong>?</p>

          <div className='flex items-center justify-between mt-4 gap-4'>
            <Dialog.Close className='flex-1 px-4 py-3 border rounded-lg border-orange-400 hover:bg-orange-500 hover:text-white transition-colors'>
              Cancelar
            </Dialog.Close>

            <button onClick={handleConfirm} className='flex-1 px-4 py-3 border rounded-lg border-red-500 bg-red-500 text-white hover:bg-red-600 transition-colors'>
              Confirmar Exclusão
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
