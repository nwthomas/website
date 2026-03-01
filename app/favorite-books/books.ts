export type Book = {
  author: string;
  imageUrl: string;
  name: string;
  url: string;
  year: number;
};

export type Books = Array<Book>;

export const FAVORITE_BOOKS: Books = [];
