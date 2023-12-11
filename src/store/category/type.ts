export type CategoryType = {
  id: number;
  name: string;
  code: string;
  productQuantity?: number
};

export type GetCategoryType = {
  id: number;
};

export type CreateCategoryType = {
  name: string;
  code: string;
};

export type UpdateCategoryType = {
  id: number;
  name: string;
  code: string;
};

export type DeleteCategoryType = GetCategoryType;