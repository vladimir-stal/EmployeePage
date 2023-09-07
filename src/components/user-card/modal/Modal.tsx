import { cn } from '../../../utils/helpers';
import { FC, ReactNode, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  children: ReactNode;
  header: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, header, onClose }) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  useEffect(() => {
    setIsOpenAnimation(true);
  }, []);

  return (
    <div
      className={cn(
        'fixed left-0 top-0 w-full h-full flex items-start justify-center bg-black transition-all ease-linear duration-900',
        {
          'bg-opacity-0': !isOpenAnimation,
          'bg-opacity-50': isOpenAnimation,
        }
      )}
    >
      <div
        className={cn(
          'bg-white p-5 sm:rounded flex flex-col relative transition-all ease-linear duration-900 w-full h-full sm:h-auto w-min-[300px] sm:w-[400px] sm:w-min-[400px] md:w-[700px] md:w-min-[700px]',
          {
            'mt-[200px]': !isOpenAnimation,
            'mt-0': isOpenAnimation,
            'sm:mt-[200px]': !isOpenAnimation,
            'sm:mt-[100px]': isOpenAnimation,
            'opacity-0': !isOpenAnimation,
            'opacity-100': isOpenAnimation,
          }
        )}
      >
        <div className="border-b border-gray-200 font-bold pb-3">{header}</div>
        <div>{children}</div>
        <button onClick={onClose}>
          <div className="flex justify-center items-center bg-white rounded-[50%] w-9 h-9 absolute top-[15px] right-[10px] md:top-[15px] md:right-[-50px]">
            <IoClose size="20px" color="gray" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Modal;
