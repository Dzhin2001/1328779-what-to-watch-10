import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/films';

export const filterFilms = createAction('films/initFilms');

export const changeGenre = createAction<Genre>('films/changeGenre');
