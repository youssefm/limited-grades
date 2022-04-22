import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment } from "react";
import { IoClose } from "react-icons/io5";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  title: string;
  onClose: () => void;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
  className?: string;
}

const Modal: FC<Props> = ({
  title,
  onClose,
  initialFocus,
  className,
  children,
}) => (
  <Transition appear show as={Fragment}>
    <Dialog
      onClose={onClose}
      className="grid fixed inset-0 place-items-center"
      initialFocus={initialFocus}
    >
      <Transition.Child
        enter="transition"
        enterFrom="opacity-0 backdrop-opacity-0"
        enterTo="opacity-100 backdrop-opacity-100"
        as={Fragment}
      >
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/60 backdrop-blur-xs" />
      </Transition.Child>
      <Transition.Child
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        as={Fragment}
      >
        <div
          className={clsx(
            "overflow-y-auto z-20 max-h-full dark:text-neutral-100",
            "bg-white dark:bg-neutral-900 rounded-lg border border-black shadow-xl",
            className
          )}
        >
          <Dialog.Title className="flex items-center p-4 text-2xl border-b border-neutral-200 dark:border-black">
            <span className="grow font-medium">{title}</span>
            <button onClick={onClose} type="button" aria-label="Close Modal">
              <IoClose className={clsx(HOVER_CLASSES, TRANSITION_CLASSES)} />
            </button>
          </Dialog.Title>
          <div className="p-4">{children}</div>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition>
);

export default Modal;
