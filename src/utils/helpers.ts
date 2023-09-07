import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FakePerson } from '../types/types';

export const formatName = (user: FakePerson) => {
  return `${firstLetterToUpperCanse(
    user.name.firstname
  )} ${firstLetterToUpperCanse(user.name.lastname)}`;
};

function firstLetterToUpperCanse(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
