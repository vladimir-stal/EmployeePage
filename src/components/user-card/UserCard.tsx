import { useEffect, useState } from 'react';
import UserCardSection from './UserCardSection';
import UserPhoto from './UserPhoto';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { formatName } from '../../utils/helpers';
import UserCardModal from './modal/UserCardModal';
import {
  UserCardModalState,
  Employee,
  UserCardModalType,
  FakePerson,
} from '../../types/types';

const UserCard = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [modal, setModal] = useState<UserCardModalState>({
    isVisible: false,
    type: 'bio',
  });

  useEffect(() => {
    (async function getEmployee() {
      const response = await axios.get('https://fakestoreapi.com/users/8');
      const data = (await response.data) as FakePerson;
      setEmployee({
        ...data,
        name: formatName(data),
        address: `${data.address.city}, ${data.address.street}`,
        position: 'Специалист по банковскому делу',
        department: 'Отдел операций по карточкам',
        photoSrc: '/userPhoto.jpg',
        bio: 'Ответсвенный и активный сотрудник. В 2015 закончил Экономичекий университет с золотой медалью. Был в командировке в Австралии и катался на кенгуру в 2019.',
      });
    })();
  }, []);

  const openModal = (type: UserCardModalType) => {
    setModal({ isVisible: true, type });
  };

  const onEmployeeDataChanged = (updatedUser: Employee) => {
    setModal({ ...modal, isVisible: false });
    setEmployee(updatedUser);
  };

  if (employee === null) {
    return (
      <div className="m-auto text-center mt-10">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <>
      <div
        className="m-auto flex flex-col gap-2 min-w-[200px] max-w-[400px]
        sm:min-w-[200px] sm:max-w-[400px]
        md:min-w-[600px] md:max-w-[800px]"
      >
        <UserCardSection onEdit={() => openModal('main')}>
          <div
            className="flex flex-col items-center
          md:flex-row md:gap-10 md:pl-3 md:items-start"
          >
            <button className="mb-3 md:mb-0" onClick={() => openModal('main')}>
              <UserPhoto src={employee.photoSrc} withIcon />
            </button>
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-[20px] font-bold text-center">
                {employee.name}
              </h1>
              <div className="font-bold text-gray-500">{employee.position}</div>
              <div className="text-[14px] font-bold text-gray-400 m-0 mt-2">
                Отдел
              </div>
              <div className="text-[14px]">{employee.department}</div>
              <div className="text-[14px] font-bold text-gray-400 m-0 mt-2">
                Офис
              </div>
              <div className="text-[14px]">{employee.address}</div>
              <div className="text-[14px] font-bold text-gray-400 m-0 mt-2">
                Email
              </div>
              <div className="text-[14px]">{employee.email}</div>
            </div>
          </div>
        </UserCardSection>
        <UserCardSection header="Биография" onEdit={() => openModal('bio')}>
          <p className="text-[14px]">{employee.bio}</p>
        </UserCardSection>
        <UserCardSection
          header="Проекты и сертификаты"
          onEdit={() => openModal('projects')}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row text-[14px] border-b border-gray-200 pb-5 ">
              <div className="w-1/3">
                <p className="font-bold">Название проекта</p>
                <p className="text-gray-500">03.05.2023</p>
              </div>
              <div className="w-2/3">
                <p>
                  Информация о проекте. Много всего интересного о том как я
                  работал на проекте вместе с Джоржем Клуни.
                </p>
              </div>
            </div>
            <div className="flex flex-row text-[14px]">
              <div className="w-1/3">
                <p className="font-bold ">International English B2</p>
                <p className="text-gray-500">15.12.2022</p>
              </div>
              <div className="w-2/3">Подробная информация о сертификате</div>
            </div>
          </div>
        </UserCardSection>
      </div>
      {modal.isVisible && (
        <UserCardModal
          user={employee}
          onSave={onEmployeeDataChanged}
          type={modal.type}
          onClose={() => setModal({ ...modal, isVisible: false })}
        />
      )}
    </>
  );
};

export default UserCard;
