import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction<string>('route/redirectToRoute');

export const redirectToBack = createAction('route/redirectToBack');
