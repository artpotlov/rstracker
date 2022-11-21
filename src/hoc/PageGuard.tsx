import { useLocation, Navigate } from 'react-router-dom';
import { pathRoutes } from 'router/router';
import { userActions } from 'store/user/user.slice';
import { selectAuthUser, selectIsExpiredToken } from 'store/user/user.selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';

interface Props {
  children: JSX.Element;
}

export function PageGuard({ children }: Props): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { logoutUser } = userActions;
  const authUser = selectAuthUser();
  const IsExpiredToken = selectIsExpiredToken();

  if (IsExpiredToken) {
    if (authUser) {
      dispatch(logoutUser());
    }

    return <Navigate to={pathRoutes.welcome} state={{ from: location }} replace />;
  }

  return children;
}
