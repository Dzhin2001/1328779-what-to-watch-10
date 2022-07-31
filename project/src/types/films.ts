export type Films = Film[];
export type Actors = string[];
export type Rating = number;
export type Film =
  {
    id: number,
    name: string,
    posterImage: string,
    previewImage: string,
    backgroundImage: string,
    backgroundColor: string,
    videoLink: string,
    previewVideoLink: string,
    description: string,
    rating: Rating,
    scoresCount: number,
    director: string,
    starring: Actors,
    runTime: number,
    genre: string,
    released: number,
    isFavorite: boolean,
  };