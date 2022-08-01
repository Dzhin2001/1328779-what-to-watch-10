import { Reviews } from '../../types/reviews';
import ReviewCard from '../review-card/review-card';

type FilmReviewsProps = {
  reviews: Reviews,
};


function FilmReviews({reviews}: FilmReviewsProps): JSX.Element {
  const halfLength = Math.ceil(reviews.length / 2);
  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">

        {
          reviews.slice(0,halfLength).map((review) => (
            <ReviewCard
              key={ review.id }
              review={ review }
            />
          ))
        }

      </div>

      <div className="film-card__reviews-col">

        {
          reviews.slice(halfLength).map((review) => (
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
