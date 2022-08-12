import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/films';

export const initFilms = createAction('films/initFilms');

export const changeGenre = createAction<Genre>('films/changeGenre');
