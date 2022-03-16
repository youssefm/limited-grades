import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FC, useRef } from "react";
import { IoClose } from "react-icons/io5";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

const MODAL_WIDTH_CLASSES = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
};

interface Props {
  title: string;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

const Modal: FC<Props> = ({ title, onClose, size = "md", children }) => {
  const closeButtonRef = useRef(null);

  return (
    <Dialog
      open
      onClose={onClose}
      className="flex fixed inset-0 justify-center items-center"
      initialFocus={closeButtonRef}
    >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs" />
      <div
        className={clsx(
          "overflow-y-auto z-20 w-full max-h-full dark:text-neutral-100",
          "bg-white dark:bg-neutral-900 rounded-lg border border-black shadow-xl",
          MODAL_WIDTH_CLASSES[size]
        )}
      >
        <Dialog.Title className="flex items-center p-4 w-full text-2xl border-b border-neutral-200 dark:border-black">
          <span className="grow font-medium">{title}</span>
          <button onClick={onClose} type="button" ref={closeButtonRef}>
            <IoClose
              className={clsx(HOVER_CLASSES, TRANSITION_CLASSES)}
              aria-label="Close Modal"
            />
          </button>
        </Dialog.Title>
        <div className="overflow-auto p-4">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
