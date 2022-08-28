import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {memo} from 'react';
import {getAuthorizationStatus, getUserData} from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.Auth && userData) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div
            className="user-block__avatar"
            onClick={() => (navigate(AppRoute.MyList))}
          >
            <img src={userData.avatarUrl} alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <a
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            className="user-block__link"
          >Sign out
          </a>
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

export default memo(UserBlock);
