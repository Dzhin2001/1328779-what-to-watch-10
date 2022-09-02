import {Fragment} from 'react';
import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <Fragment>
      <h1>
        404 Not Found
      </h1>
      <br />
      <Link to="/">Go to main page</Link>
    </Fragment>
  );
}

export default NotFoundScreen;
