/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Route, RouteProps, useLocation,
} from 'react-router';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

import { meAction, signOnAction } from '@/store/actions/auth';
import { selectAuthUser } from '@/store/selectors/auth';

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [allowRender, setAllowRender] = React.useState(false);

  const user = useSelector(selectAuthUser);

  const renderComponent = React.useCallback(() => (
    (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: location },
        }}
      />
    )
  ), [location]);

  const isAuthorized = React.useMemo(() => Boolean(user), [user]);

  React.useEffect(() => {
    const start = async () => {
      try {
        if (!user) {
          const params = new URLSearchParams(location.search);

          if (params.has('clientId') && params.has('token')) {
            await dispatch(signOnAction({
              clientId: params.get('clientId')!,
              requestToken: params.get('token')!,
            }));
          }

          await dispatch(meAction());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAllowRender(true);
      }
    };

    start();
  }, [dispatch, location, user]);

  if (isAuthorized && allowRender) {
    return <Route {...props} />;
  }

  if (allowRender) {
    return <Route {...props} component={renderComponent} />;
  }

  return (
    <Page>
      <CircularProgress />
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default PrivateRoute;
