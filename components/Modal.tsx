import { Dialog } from "@headlessui/react";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
}

export const Modal: FC<Props> = (props) => {
  const { title, open, onClose, children } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 flex justify-center items-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <div className="bg-white rounded-lg shadow-xl z-20 sm:max-w-3xl sm:w-full">
        {title && (
          <Dialog.Title className="p-4 border-b-[1px] flex w-full items-center">
            <span className="flex-grow text-2xl font-medium">{title}</span>
            <IoClose
              onClick={onClose}
              className="text-2xl hover:text-zinc-500 hover:cursor-pointer"
            />
          </Dialog.Title>
        )}
        <div className="p-4">{children}</div>
      </div>
    </Dialog>
  );
};
