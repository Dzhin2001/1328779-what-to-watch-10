import {useAppDispatch, useAppSelector} from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../../components/not-found-screen/not-found-screen';
import {redirectToBack} from '../../store/action';
import {useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import format from 'format-duration';
import {getInitialFilms, getLoadedFilmStatus} from '../../store/film-data/selectors';

function Player(): JSX.Element {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getInitialFilms);
  const isLoading = useAppSelector(getLoadedFilmStatus);
  const { id } = useParams();
  const film = films.find((element) => element.id.toString() === id);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  const videoDuration = ref.current ? ref.current.duration : 0;

  const handleVideoCanPlay = () => {
    if (ref.current) {
      ref.current.play();
    }
  };
  const handleVideoPlay = () => setIsPlay(true);
  const handleVideoPause = () => setIsPlay(false);
  const handleVideoTimeUpdate = () => setCurrentTime(ref.current ? ref.current.currentTime : 0);
  const handleBtnPlayClick = () => {
    if (ref.current) {
      if (isPlay) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
    }
  };
  const handleBtnFullScreenClick = () => {
    if (ref.current) {
      ref.current.requestFullscreen();
    }
  };
  const handleBtnExitClick = () => dispatch(redirectToBack());

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }
  if (!film) {
    return (
      <NotFoundScreen />
    );
  }

  return (
    <div className="player">
      <video
        ref={ref}
        src={film.videoLink}
        className="player__video"
        poster={film.previewImage}
        onCanPlay={handleVideoCanPlay}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onTimeUpdate={handleVideoTimeUpdate}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={handleBtnExitClick}
      >Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={`${Math.ceil( currentTime / videoDuration * 100)}`} max="100"
            >
            </progress>
            <div
              className="player__toggler"
              style={{left: `${Math.ceil( currentTime / videoDuration * 100)}%`}}
            >Toggler
            </div>
          </div>
          <div className="player__time-value">{format( 1000 * (currentTime - videoDuration), { leading: true })}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handleBtnPlayClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={`${isPlay ? '#pause' : '#play-s'}`}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleBtnFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
