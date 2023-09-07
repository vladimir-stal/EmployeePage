import { FC, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { MdCloudUpload } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';
import UserPhoto from '../UserPhoto';
import UserCardInput from './UserCardInput';
import { Employee } from '../../../types/types';
import axios from 'axios';

interface UserCardModalMainProps {
  user: Employee;
  closeModal: () => void;
  onSave: (user: Employee) => void;
}

const UserCardModalMain: FC<UserCardModalMainProps> = ({
  user,
  closeModal,
  onSave,
}) => {
  const [file, setFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee & { photo: FileList }>({
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    const response = await axios.put(
      'https://fakestoreapi.com/users/8',
      formData
    );
    const updatedUser = await response.data;
    onSave({
      ...updatedUser,
      photoSrc: file === null ? user.photoSrc : file,
    } as Employee);
    setIsLoading(false);
  });

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const f = event.target.files[0];
      setFile(URL.createObjectURL(f));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 mt-6 items-center"
      noValidate
    >
      <UserPhoto src={file === null ? user.photoSrc! : file} />
      <Button
        variant="contained"
        component="label"
        startIcon={<MdCloudUpload />}
      >
        Загрузить фото
        <input type="file" onChange={fileSelected} hidden />
      </Button>
      <UserCardInput
        label="Имя"
        {...register('name', {
          required: true,
          maxLength: { value: 40, message: 'maxLength:40' },
        })}
        required
        error={errors.name !== undefined}
      />
      <UserCardInput
        label="Должность"
        {...register('position', {
          required: true,
          maxLength: { value: 30, message: 'maxLength:30' },
        })}
        required
        error={errors.position !== undefined}
      />
      <UserCardInput
        label="Отдел"
        {...register('department', {
          required: true,
          maxLength: { value: 30, message: 'maxLength:30' },
        })}
        required
        error={errors.department !== undefined}
      />
      <UserCardInput
        label="Офис"
        {...register('address', {
          required: true,
          maxLength: { value: 30, message: 'maxLength:30' },
        })}
        required
        error={errors.address !== undefined}
      />
      <UserCardInput
        label="Email"
        {...register('email', {
          required: true,
          maxLength: { value: 30, message: 'maxLength:30' },
        })}
        required
        error={errors.email !== undefined}
      />
      <div className="flex flex-row gap-1 justify-center mt-5">
        <Button
          type="submit"
          variant="contained"
          startIcon={isLoading ? <CircularProgress size="14px" /> : null}
          disabled={isLoading}
        >
          Сохранить
        </Button>
        <Button variant="outlined" onClick={closeModal} disabled={isLoading}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default UserCardModalMain;
