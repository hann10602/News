import { FieldValue } from "firebase/firestore";

export type NewsType = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  category: string;
  categoryId: string;
  image: string;
};

export type GetNewsType = {
  id: string;
};

export type CreateNewsType = {
  title: string;
  content: string;
  createdDate: FieldValue;
  categoryId: string;
};

export type UpdateNewsType = {
  id: string;
  title: string;
  content: string;
  createdDate: FieldValue;
  categoryId: string;
};

export type DeleteNewsType = GetNewsType;
