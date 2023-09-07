import { FC } from 'react';
import { MdPhotoCamera } from 'react-icons/md';

interface UserPhotoProps {
  src: string;
  withIcon?: boolean;
}

const UserPhoto: FC<UserPhotoProps> = ({ src, withIcon = false }) => {
  return (
    <div className="test-1 w-[160px] h-[160px] border border-white border-solid rounded-[50%] overflow-hidden relative">
      <div className="c-1 w-[180px] h[180px]">
        <img src={src} alt="user" className="w-full h-full" />
      </div>
      {withIcon && (
        <div
          className="c-2 absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center 
      opacity-0 transition-opacity ease-in-out duration-300 cursor-pointer"
        >
          <MdPhotoCamera size="40px" color="white" />
        </div>
      )}
    </div>
  );
};

export default UserPhoto;
