import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type AuthorizationRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element;
}

function AuthorizationRoute(props: AuthorizationRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}

export default AuthorizationRoute;
