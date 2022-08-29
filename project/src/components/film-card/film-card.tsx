import {Film} from '../../types/films';
import {Link} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

type FilmCardProps = {
  film: Film,
};

function FilmCard({film}: FilmCardProps): JSX.Element {
  const id = film.id;
  const [ needPlaying, setNeedPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (needPlaying) {
      ref.current && ref.current.play();
      return;
    }
    ref.current && ref.current.load();
  }, [needPlaying]);

  const handleMouseOver = () => {
    timerId.current = setTimeout(() => (setNeedPlaying(true)),1000);
  };

  const handleMouseOut = () => {
    if (!needPlaying) {
      timerId.current && clearTimeout(timerId.current);
    }
    setNeedPlaying(false);
  };

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver = {handleMouseOver}
      onMouseOut = {handleMouseOut}
    >
      <div className="small-film-card__image">
        <video
          ref={ref}
          src={film.previewVideoLink}
          poster={film.previewImage}
          muted
          width="280"
          height="175"
          controls={false}
          loop={false}
          autoPlay={false}
        >
        </video>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id.toString()}`} className="small-film-card__link">{film.name} </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
