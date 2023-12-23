export type IntegrateNewsType = {
  article_id: string;
  title: string;
  image_url?: string;
  content: string;
  description: string;
  category: string[];
};

export type GetIntegrateNewsType = {
  id: string;
};
