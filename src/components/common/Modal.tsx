import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { IoClose } from "react-icons/io5";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  title: string;
  onClose: () => void;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
  useTransition?: boolean;
  className?: string;
  children: ReactNode;
}

const OVERLAY_FROM_CLASS = "opacity-0 backdrop-opacity-0";
const OVERLAY_TO_CLASS = "opacity-100 backdrop-opacity-100";
const MODAL_FROM_CLASS = "opacity-0";
const MODAL_TO_CLASS = "opacity-100";

const Overlay: FC<{ className?: string }> = ({ className }) => (
  <Dialog.Overlay
    className={clsx(
      "fixed inset-0 z-10 bg-black/60 backdrop-blur-xs",
      className
    )}
  />
);

const ModalBody: FC<{
  title: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}> = ({ title, onClose, className, children }) => (
  <div
    className={clsx(
      "z-20 max-h-[95%] max-w-[95%] overflow-y-auto dark:text-neutral-100",
      "rounded-lg border border-black bg-white shadow-xl dark:bg-neutral-900",
      className
    )}
  >
    <Dialog.Title className="flex items-center border-b border-neutral-200 p-4 text-2xl dark:border-black">
      <span className="grow font-medium">{title}</span>
      <button onClick={onClose} type="button" aria-label="Close Modal">
        <IoClose className={clsx(HOVER_CLASSES, TRANSITION_CLASSES)} />
      </button>
    </Dialog.Title>
    <div className="p-4">{children}</div>
  </div>
);

const Modal: FC<Props> = ({
  title,
  onClose,
  initialFocus,
  useTransition = true,
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

  const internalOnClose = useCallback((): void => {
    document.documentElement.classList.add("scrollbar-gutter-stable");
    document.body.style.removeProperty("padding-right");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        internalOnClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [internalOnClose]);

  if (!useTransition) {
    return (
      <Dialog
        open
        onClose={internalOnClose}
        className="fixed inset-0 grid place-items-center"
        initialFocus={initialFocus}
      >
        <Overlay className={OVERLAY_TO_CLASS} />
        <ModalBody
          title={title}
          onClose={internalOnClose}
          className={clsx(MODAL_TO_CLASS, className)}
        >
          {children}
        </ModalBody>
      </Dialog>
    );
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        onClose={internalOnClose}
        className="fixed inset-0 grid place-items-center"
        initialFocus={initialFocus}
      >
        <Transition.Child
          enter="transition duration-50"
          enterFrom={OVERLAY_FROM_CLASS}
          enterTo={OVERLAY_TO_CLASS}
          as={Fragment}
        >
          <Overlay />
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity duration-50"
          enterFrom={MODAL_FROM_CLASS}
          enterTo={MODAL_TO_CLASS}
          as={Fragment}
        >
          <ModalBody
            title={title}
            onClose={internalOnClose}
            className={className}
          >
            {children}
          </ModalBody>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
