import './loading-screen.css';
import ClipLoader from 'react-spinners/ClipLoader';

function LoadingScreen(): JSX.Element {
  return (
    <div className='loading_container'>
      <div className='loading_div'>
        <p>Loading ...</p>
        <ClipLoader color={'#dc3545'} loading cssOverride={{}} size={50} />
      </div>
    </div>
  );
}

export default LoadingScreen;
