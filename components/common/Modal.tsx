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
      className="flex fixed inset-0 justify-center items-center"
      initialFocus={completeButtonRef}
    >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs" />
      <div className="z-20 w-full max-w-3xl max-h-screen bg-white rounded-lg shadow-xl">
        <Dialog.Title className="flex items-center p-4 w-full border-b">
          <span className="grow text-2xl font-medium">{title}</span>
          <button onClick={onClose} type="button" ref={completeButtonRef}>
            <IoClose className="text-2xl hover:text-zinc-500" />
          </button>
        </Dialog.Title>
        <div className="overflow-auto p-4">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
