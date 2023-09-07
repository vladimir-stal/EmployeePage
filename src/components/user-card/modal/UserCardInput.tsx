import { FC, forwardRef, Ref } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type UserCardInputProps = {
  label?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
  error?: boolean;
  multiline?: boolean;
  ref?: Ref<HTMLInputElement>;
};

const UserCardInput: FC<UserCardInputProps> = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      className="w-full md:w-[400px]"
      size="small"
      ref={ref}
      {...props}
    />
  );
});

export default UserCardInput;
