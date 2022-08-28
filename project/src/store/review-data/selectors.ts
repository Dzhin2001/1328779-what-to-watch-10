import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Reviews} from '../../types/reviews';

export const getReviews = (state: State): Reviews => state[NameSpace.Review].reviews;
export const getBlockedFormStatus = (state: State): boolean => state[NameSpace.Review].isFormBlocked;
