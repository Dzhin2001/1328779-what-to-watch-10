import ReviewCard from '../review-card/review-card';
import {useEffect} from 'react';
import {fetchReviewsAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getReviews} from '../../store/review-data/selectors';

type FilmReviewsProps = {
  id: string,
};


function FilmReviews({id}: FilmReviewsProps): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const getHalfLength = () => (Math.ceil(reviews.length / 2));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id]);

  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">

        {
          reviews.slice(0,getHalfLength()).map((review) => (
            <ReviewCard
              key={ review.id }
              review={ review }
            />
          ))
        }

      </div>

      <div className="film-card__reviews-col">

        {
          reviews.slice(getHalfLength()).map((review) => (
            <ReviewCard
              key={ review.id }
              review={ review }
            />
          ))
        }

      </div>

    </div>
  );
}

export default FilmReviews;
