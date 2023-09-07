export interface Employee {
  id: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  name: string;
  address: string;
  position: string;
  department: string;
  photoSrc: string;
  bio: string;
}

export interface FakePerson {
  id: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
  };
}

export type UserCardModalType = 'main' | 'bio' | 'projects';

export interface UserCardModalState {
  isVisible: boolean;
  type: UserCardModalType;
}
