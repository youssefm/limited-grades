import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FC, useRef } from "react";
import { IoClose } from "react-icons/io5";

import { HOVER_CLASSES } from "lib/styles";

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
      <div
        className={clsx(
          "z-20 w-full max-w-3xl max-h-screen dark:text-neutral-100",
          "bg-white dark:bg-neutral-900 rounded-lg border dark:border-black shadow-xl"
        )}
      >
        <Dialog.Title className="flex items-center p-4 w-full text-2xl border-b border-neutral-200 dark:border-black">
          <span className="grow font-medium">{title}</span>
          <button onClick={onClose} type="button" ref={completeButtonRef}>
            <IoClose className={HOVER_CLASSES} />
          </button>
        </Dialog.Title>
        <div className="overflow-auto p-4">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
