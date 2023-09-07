import { FC, ReactNode } from 'react';
import { MdEdit } from 'react-icons/md';

interface UserCardSectionProps {
  children: ReactNode;
  onEdit: () => void;
  header?: string;
}

const UserCardSection: FC<UserCardSectionProps> = ({
  children,
  header = null,
  onEdit,
}) => {
  return (
    <div className="border border-gray-200 rounded-md bg-white relative">
      {header && (
        <div className="w-full border-b border-gray-200 py-4 pl-4 font-bold text-[14px]">
          {header}
        </div>
      )}
      <div className="p-4">{children}</div>
      <button onClick={onEdit}>
        <div
          className="absolute right-3 top-3 w-[30px] h-[30px] border border-gray-200 rounded-[50%]
      flex justify-center items-center cursor-pointer hover:border-gray-400"
        >
          <MdEdit color="gray" />
        </div>
      </button>
    </div>
  );
};

export default UserCardSection;
