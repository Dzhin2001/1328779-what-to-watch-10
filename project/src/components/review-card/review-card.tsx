import { Review } from '../../types/reviews';

type ReviewCardProps = {
  review: Review,
};


function ReviewCard({review}: ReviewCardProps): JSX.Element {
  const getReviewDate = (time:string) => (new Date(time).toLocaleDateString('en-US',{ month: 'long', day: 'numeric', year: 'numeric'}));
  return (
    <div className="review">

      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{getReviewDate(review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default ReviewCard;
