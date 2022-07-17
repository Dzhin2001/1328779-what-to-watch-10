import Main from '../../pages/main/main';

type AppScreenProps = {
  filmDetails: {
    name: string,
    genre: string,
    year: number,
  }
};

function App({filmDetails}:AppScreenProps ): JSX.Element {
  return (
    <Main filmDetails={filmDetails} />
  );
}

export default App;
