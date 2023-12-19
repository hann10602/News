export type UserType = {
  id: string;
  name: string;
  email: string;
  phoneNum: string;
  avatar: string;
  role: string;
};

export type GetUserType = {
  id: string;
};

export type CreateUserType = {
  email: string;
  password: string;
};

export type UpdateUserType = {
  name: string;
  email: string;
  phoneNum: string;
  avatar: string;
};

export type ChangePasswordUserType = {
  id: string;
  newPassword: string;
};

export type DeleteUserType = GetUserType;
