export type NewsType = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  categoryId: string;
};

export type GetNewsType = {
  id: string;
};

export type CreateNewsType = {
  title: string;
  content: string;
  createdDate: string;
  categoryId: string;
};

export type UpdateNewsType = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  categoryId: string;
};

export type DeleteNewsType = GetNewsType;
