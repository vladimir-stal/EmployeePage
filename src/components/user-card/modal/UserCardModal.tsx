import { FC, useState, useEffect } from 'react';
import Modal from './Modal';
import { Employee, UserCardModalType } from '../../../types/types';
import UserCardModalMain from './UserCardModalMain';
import UserCardModalBio from './UserCardModalBio';
import UserCardModalProjects from './UserCardModalProjects';

interface UserCardModalProps {
  type: UserCardModalType;
  user: Employee;
  //isVisible: boolean;
  onClose: () => void;
  onSave: (user: Employee) => void;
}

const UserCardModal: FC<UserCardModalProps> = ({
  type,
  user,
  // isVisible,
  onClose,
  onSave,
}) => {
  const closeModal = () => {
    onClose();
  };

  const headers = {
    main: 'Основная информация',
    bio: 'Биография',
    projects: 'Проекты и сертификаты',
  };

  const content = {
    main: (
      <UserCardModalMain user={user} closeModal={closeModal} onSave={onSave} />
    ),
    bio: (
      <UserCardModalBio user={user} closeModal={closeModal} onSave={onSave} />
    ),
    projects: <UserCardModalProjects />,
  };

  return (
    <Modal header={headers[type]} onClose={closeModal}>
      {content[type]}
    </Modal>
  );
};

export default UserCardModal;
