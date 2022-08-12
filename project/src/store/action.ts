import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/films';

export const initFilmsCount = createAction('films/initCount');

export const incFilmsCount = createAction('films/incCount');

export const filterFilms = createAction('films/initFilms');

export const changeGenre = createAction<Genre>('films/changeGenre');
