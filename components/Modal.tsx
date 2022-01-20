import { Dialog } from "@headlessui/react";
import { FC, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  title: string;
  onClose: () => void;
}

const Modal: FC<Props> = ({ title, onClose, children }) => {
  const completeButtonRef = useRef(null);

  return (
    <Dialog
      open
      onClose={onClose}
      className="fixed inset-0 flex justify-center items-center"
      initialFocus={completeButtonRef}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <div className="bg-white rounded-lg shadow-xl z-20 w-full max-w-3xl max-h-screen">
        <Dialog.Title className="p-4 border-b-[1px] flex w-full items-center">
          <span className="flex-grow text-2xl font-medium">{title}</span>
          <button onClick={onClose} ref={completeButtonRef}>
            <IoClose className="text-2xl hover:text-zinc-500" />
          </button>
        </Dialog.Title>
        <div className="p-4 overflow-auto">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
