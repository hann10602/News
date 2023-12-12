export type NewsType = {
  id: string;
  title: string;
  content: string;
  category_id: string;
  created_date: string;
};

export type GetNewsType = {
  id: string;
};

export type CreateNewsType = {
  name: string;
  code: string;
};

export type UpdateNewsType = {
  id: string;
  name: string;
  code: string;
};

export type DeleteNewsType = GetNewsType;
