import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewData} from '../../types/state';
import {fetchReviewsAction, postNewReviewAction, } from '../api-actions';

const initialState: ReviewData = {
  reviews: [],
  isDataLoaded: false,
  isFormBlocked: false,
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.isDataLoaded = false;
      })
      .addCase(postNewReviewAction.pending, (state) => {
        state.isFormBlocked = true;
      })
      .addCase(postNewReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isFormBlocked = false;
      })
      .addCase(postNewReviewAction.rejected, (state) => {
        state.reviews = [];
        state.isFormBlocked = false;
      });
  }
});
