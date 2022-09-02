import {reviewData} from './review-data';
import {fetchReviewsAction, postNewReviewAction } from '../api-actions';
import {makeFakeReviews, makeFakeNewReview} from '../../utils/mocks';
import {ReviewData} from '../../types/state';

const mockReviews = makeFakeReviews();
const mockNewReview = makeFakeNewReview();

describe('Reducer: reviewsData', () => {
  let state: ReviewData;

  beforeEach(() => {
    state = {
      reviews: [],
      isFormBlocked: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews by load reviews', () => {
      expect(reviewData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews}))
        .toEqual({reviews: mockReviews, isFormBlocked: false });
    });
    it('should rejected to load reviews', () => {
      expect(reviewData.reducer(state, {type: fetchReviewsAction.rejected.type, payload: mockReviews}))
        .toEqual(state);
    });
  });

  describe('postNewReviewAction test', () => {
    it('should pending to blocked form', () => {
      expect(reviewData.reducer(state, {type: postNewReviewAction.pending.type, payload: mockNewReview}))
        .toEqual({
          ...state,
          isFormBlocked: true,
        });
    });
    it('should add|delete one review in over', () => {
      expect(reviewData.reducer(state, {type: postNewReviewAction.fulfilled.type, payload: mockNewReview}))
        .toEqual({
          ...state,
          reviews: mockNewReview,
        });
    });
    it('should rejected to add review', () => {
      expect(reviewData.reducer(state, {type: postNewReviewAction.rejected.type, payload: mockNewReview}))
        .toEqual(state);
    });
  });
});
