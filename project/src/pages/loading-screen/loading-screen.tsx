import ClipLoader from 'react-spinners/ClipLoader';

function LoadingScreen(): JSX.Element {
  return (
    <>
      <p>Loading ...</p>
      <ClipLoader color={'#dc3545'} loading cssOverride={{}} size={50} />
    </>
  );
}

export default LoadingScreen;
