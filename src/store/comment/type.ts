export type CommentType = {
  id: string;
  newsId: string;
  userId: string;
  content: string;
};

export type GetCommentType = {
  id: string;
};

export type CreateCommentType = {
  name: string;
  code: string;
};

export type UpdateCommentType = {
  id: string;
  name: string;
  code: string;
};

export type DeleteCommentType = GetCommentType;
