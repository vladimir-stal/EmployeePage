import { FC, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import UserCardInput from './UserCardInput';
import { Employee } from '../../../types/types';
import axios from 'axios';

interface UserCardModalBioProps {
  user: Employee;
  closeModal: () => void;
  onSave: (user: Employee) => void;
}

const UserCardModalBio: FC<UserCardModalBioProps> = ({
  user,
  closeModal,
  onSave,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<{ bio: string }>({
    defaultValues: {
      bio: user.bio,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    const response = await axios.put('https://fakestoreapi.com/users/8', {
      ...user,
      bio: formData.bio,
    });
    const updatedUser = await response.data;
    onSave(updatedUser as Employee);
    setIsLoading(false);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 mt-6 items-center"
      noValidate
    >
      <UserCardInput label="Биография" multiline {...register('bio')} />
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

export default UserCardModalBio;
