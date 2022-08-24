export type Reviews = Review[];
export type Comment = string;

export type User = {
    id: number,
    name: string,
  };

export type Review ={
  comment: Comment,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type UserReview ={
  idFilm: number,
  newComment: {
    comment: Comment,
    rating: number,
  }
};
