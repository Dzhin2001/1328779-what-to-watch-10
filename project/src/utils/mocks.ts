import faker from 'faker';
import {Comment, Reviews, Review, User, UserReview} from '../types/reviews';
import {UserData} from '../types/user-data';
import {Actors, Genre, Rating, Film, Films} from '../types/films';

export const makeFakeReviews = (reviewCount: number): Reviews => (
  new Array(reviewCount).map((element, index) => ({
    comment: faker.random.words(5) as Comment,
    date: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z').toISOString() ,
    id: index,
    rating: faker.datatype.number(10),
    user: {
      id: faker.datatype.number(100),
      name: faker.name.firstName(),
    } as User,
  } as Review)) as Reviews);

export const makeFakeNewReview = (): UserReview => ({
  idFilm: faker.datatype.number(100),
  newComment: {
    comment: faker.random.words(10) as Comment,
    rating: faker.datatype.number(10),
  }
} as UserReview);

export const makeFakeUserData = (): UserData => ({
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  id: faker.datatype.number(100),
  name: faker.name.firstName(),
  token: faker.datatype.uuid(),
} as UserData);

export const makeFakeFilm = (idFilm: number): Film => ({
  id: idFilm,
  name: faker.name.title(),
  posterImage: faker.image.image(),
  previewImage: faker.image.image(),
  backgroundImage: faker.image.image(),
  backgroundColor: faker.internet.color(),
  videoLink: faker.internet.url(),
  previewVideoLink: faker.internet.url(),
  description: faker.random.words(10),
  rating: faker.datatype.number(10) as Rating,
  scoresCount: faker.datatype.number(10),
  director: faker.name.firstName().concat(' ', faker.name.lastName()),
  starring: Array.from({length: faker.datatype.number(4)}, () => faker.name.firstName().concat(' ', faker.name.lastName())) as Actors,
  runTime: faker.datatype.number(200),
  genre: faker.music.genre() as Genre,
  released: faker.datatype.number({min: 1980, max: 2022}),
  isFavorite: faker.datatype.boolean(),
} as Film);

export const makeFakeInitialFilms = (filmCount: number): Films => (Array.from({length: filmCount}, (element, index) => makeFakeFilm(index)));

export const makeNewComment = (filmId: number): UserReview => ({
  idFilm: filmId,
  newComment: {
    comment: faker.random.words(10) as Comment,
    rating: faker.datatype.number(10),
  }
});
