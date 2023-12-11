export type UserType = {
    id: number;
    fullName: string;
    username: string;
    password: string;
    email: string;
    phoneNum: string;
    avatar: string;
    role: string;
    address: string;
  };
  
  export type GetUserType = {
    id: number;
  };
  
  export type CreateUserType = {
    fullName: string;
    username: string;
    password: string;
    email: string;
    phoneNum: string;
    avatar?: string;
    role: string;
    address: string;
  };
  
  export type UpdateUserType = {
    id: number;
    fullName: string;
    username: string;
    password?: string;
    email: string;
    avatar?: string;
    phoneNum: string;
    role?: string;
    address: string;
  };
  
  export type ChangePasswordUserType = {
    id: number;
    oldPassword: string;
    newPassword: string;
  };
  
  export type DeleteUserType = GetUserType;
  