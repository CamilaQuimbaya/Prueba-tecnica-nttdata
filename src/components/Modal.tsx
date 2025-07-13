import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo oscuro translúcido */}
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-500"
          enterFrom="opacity-0 scale-90 translate-y-6"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition ease-in-out duration-400"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-90 translate-y-6"

        >
          <div className="fixed inset-0 bg-purple-900/60 backdrop-blur-sm transition-all duration-500 ease-in-out" />

        </Transition.Child>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500"
            enterFrom="opacity-0 scale-90 translate-y-6"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in-out duration-400"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-90 translate-y-6"
          >
            <Dialog.Panel className="transition-transform duration-500 w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-white/30 bg-white/20 backdrop-blur-xl text-white relative">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              {children}
            </Dialog.Panel>
          </Transition.Child>

        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
