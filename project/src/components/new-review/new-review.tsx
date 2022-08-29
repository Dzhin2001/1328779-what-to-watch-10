import {UserReview} from '../../types/reviews';
import {FormEvent, useState} from 'react';
import {postNewReviewAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getBlockedFormStatus} from '../../store/review-data/selectors';
import {Film} from '../../types/films';
import {CommentSetting} from '../../const';

type NewReviewProps = {
  film: Film,
};

function NewReview({film}: NewReviewProps): JSX.Element {
  const isFormBlocked = useAppSelector(getBlockedFormStatus);
  const dispatch = useAppDispatch();
  const [newReview, setNewReview] = useState(
    {
      rating: '8',
      reviewText: '',
      isSubmitBlocked: true,
    });
  const getValidText = (text: string) => (text.length >= 50 && text.length <= 400);

  const reviewChangeHandle = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setNewReview({
      ...newReview,
      [name]: value,
      isSubmitBlocked: name === 'reviewText' ? !getValidText(value) : newReview.isSubmitBlocked
    });
  };

  const onSubmit = (review: UserReview) => {
    dispatch(postNewReviewAction(review));
  };

  type StarInputProps = {index: string};

  const StarInput = ({index}:StarInputProps): JSX.Element => (
    <>
      <input
        className="rating__input"
        id={`star-${index}`}
        type="radio"
        name="rating"
        value={index}
        checked={newReview.rating === index}
        onChange={reviewChangeHandle}
        disabled={isFormBlocked}
      />
      <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
    </>
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (newReview.reviewText !== null
      && film !== null
      && newReview.reviewText.length >= CommentSetting.MinLength
      && newReview.reviewText.length <= CommentSetting.MaxLength
    ) {
      onSubmit({
        idFilm: film.id,
        newComment: {
          comment: newReview.reviewText,
          rating: +newReview.rating,
        }
      });
    }
  };

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
        onSubmit={handleSubmit}
      >
        <div className="rating">
          <div className="rating__stars">

            {
              Array.from({length: 10}).map(
                (e, index) => {
                  const key = (10 - index).toString();
                  return (
                    <StarInput
                      key={key}
                      index={key}
                    />
                  );
                }
              )
            }

          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea" name="reviewText" id="reviewText" placeholder="Review text"
            disabled={isFormBlocked}
            onChange={reviewChangeHandle} value={newReview.reviewText}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isFormBlocked || newReview.isSubmitBlocked}
            >Post
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default NewReview;
