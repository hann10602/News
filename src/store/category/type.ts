export type CategoryType = {
  id: string;
  name: string;
  code: string;
  productQuantity?: number;
};

export type GetCategoryType = {
  id: string;
};

export type CreateCategoryType = {
  name: string;
  code: string;
};

export type UpdateCategoryType = {
  id: string;
  name: string;
  code: string;
};

export type DeleteCategoryType = GetCategoryType;
