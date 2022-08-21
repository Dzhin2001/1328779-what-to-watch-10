import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const {userData, authorizationStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth && userData) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={userData.avatarUrl} alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <a onClick={() => dispatch(logoutAction())} className="user-block__link">Sign out</a>
        </li>
      </ul>
    );
  } else {
    return (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>
    );
  }
}

export default UserBlock;