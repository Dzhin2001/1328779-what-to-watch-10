import {useAppDispatch, useAppSelector} from '../../hooks';
import NotFoundScreen from '../../components/error-404/not-found-screen';
import {redirectToBack} from '../../store/action';
import {useState, useRef} from 'react';

const getMovieTimeFormatted = (secondTime: number): string => {
  if (secondTime >= 3600) {
    return `-${Math.trunc(secondTime / 3600)}:${Math.trunc(secondTime % 3600 / 60)}:${Math.ceil(secondTime % 60)}`;
  }
  return `-${Math.trunc(secondTime / 60)}:${Math.ceil(secondTime % 60)}`;
};

function Player(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isPlay, setIsPlay] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const film = useAppSelector((state) => state.film);
  const videoDuration = ref.current ? ref.current.duration : 0;

  if (film) {
    return (
      <div className="player">
        <video
          ref={ref}
          src={film.videoLink}
          className="player__video"
          poster={film.previewImage}
          onCanPlay={() => {
            if (ref.current) {
              ref.current.play();
            }
          }}
          onPlay={() => setIsPlay(true)}
          onPause={() => setIsPlay(false)}
        >
        </video>

        <button
          type="button"
          className="player__exit"
          onClick={() => dispatch(redirectToBack())}
        >Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: '30%'}} >Toggler</div>
            </div>
            <div className="player__time-value">{getMovieTimeFormatted(videoDuration)}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={() => {
                if (ref.current) {
                  if (isPlay) {
                    ref.current.pause();
                  } else {
                    ref.current.play();
                  }
                }
              }}
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
              onClick={() => {
                if (ref.current) {
                  ref.current.requestFullscreen();
                }
              }}
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
  } else {
    return <NotFoundScreen />;
  }
}

export default Player;
