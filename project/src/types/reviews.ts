export type Reviews = Review[];
export type Comment = string;

export type User = {
    id: number,
    name: string,
  };

export type Review ={
    comment: Comment,
    date: Date,
    id: number,
    rating: number,
    user: User,
  };
