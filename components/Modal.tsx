import { Dialog } from "@headlessui/react";
import { FC, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  title: string;
  onClose: () => void;
}

const Modal: FC<Props> = (props) => {
  const { title, onClose, children } = props;
  const completeButtonRef = useRef(null);

  return (
    <Dialog
      open
      onClose={onClose}
      className="fixed inset-0 flex justify-center items-center"
      initialFocus={completeButtonRef}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <div className="bg-white rounded-lg shadow-xl z-20 sm:max-w-3xl sm:w-full">
        <Dialog.Title className="p-4 border-b-[1px] flex w-full items-center">
          <span className="flex-grow text-2xl font-medium">{title}</span>
          <button onClick={onClose} ref={completeButtonRef}>
            <IoClose className="text-2xl hover:text-zinc-500" />
          </button>
        </Dialog.Title>
        <div className="p-4">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
