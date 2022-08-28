import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Films, Film} from '../../types/films';


export const getInitialFilms = (state: State): Films => state[NameSpace.Film].initialFilms;
export const getFilm = (state: State): Film | null=> state[NameSpace.Film].film;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Film].promoFilm;
export const getSimilarFilms = (state: State): Films => state[NameSpace.Film].similarFilms;
export const getLoadedFilmStatus = (state: State): boolean => state[NameSpace.Film].isDataLoaded;
