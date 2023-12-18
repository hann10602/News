export type UserType = {
  id: number;
  name: string;
  email: string;
  phoneNum: string;
  avatar: string;
  role: string;
};

export type GetUserType = {
  id: number;
};

export type CreateUserType = {
  name: string;
  email: string;
  phoneNum: string;
  avatar: string;
  role: number;
};

export type UpdateUserType = {
  id: number;
  name: string;
  email: string;
  phoneNum: string;
  avatar: string;
  role: number;
};

export type ChangePasswordUserType = {
  id: number;
  newPassword: string;
};

export type DeleteUserType = GetUserType;
