import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, useLayoutEffect } from "react";
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
}) => {
  // If we allow scrollbar-gutter-stable to remain on the root element,
  // it results in a solid bar on the right side of the screen
  // By temporarily removing scrollbar-gutter-stable and replacing it with padding,
  // we're able to remove that bar while avoiding layout shifts
  useLayoutEffect(() => {
    const { documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.offsetWidth;
    documentElement.classList.remove("scrollbar-gutter-stable");
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  });

  const internalOnClose = () => {
    document.documentElement.classList.add("scrollbar-gutter-stable");
    document.body.style.removeProperty("padding-right");
    onClose();
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        onClose={internalOnClose}
        className="grid fixed inset-0 place-items-center"
        initialFocus={initialFocus}
      >
        <Transition.Child
          enter="transition duration-50"
          enterFrom="opacity-0 backdrop-opacity-0"
          enterTo="opacity-100 backdrop-opacity-100"
          as={Fragment}
        >
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black/60 backdrop-blur-xs" />
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          as={Fragment}
        >
          <div
            className={clsx(
              "overflow-y-auto z-20 max-w-[95%] max-h-[95%] dark:text-neutral-100",
              "bg-white dark:bg-neutral-900 rounded-lg border border-black shadow-xl",
              className
            )}
          >
            <Dialog.Title className="flex items-center p-4 text-2xl border-b border-neutral-200 dark:border-black">
              <span className="grow font-medium">{title}</span>
              <button
                onClick={internalOnClose}
                type="button"
                aria-label="Close Modal"
              >
                <IoClose className={clsx(HOVER_CLASSES, TRANSITION_CLASSES)} />
              </button>
            </Dialog.Title>
            <div className="p-4">{children}</div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
