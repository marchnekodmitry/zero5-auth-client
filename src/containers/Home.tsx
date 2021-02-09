import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { IUser } from '@/api/models/user';

import { selectAuthUser } from '@/store/selectors/auth';
import { logoutAction } from '@/store/actions/auth';

const Home: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectAuthUser);

  const logoutHandler = React.useCallback(async () => {
    await dispatch(logoutAction());

    history.push('/sign-in');
  }, [dispatch, history]);

  if (!user) return null;

  return (
    <Page>
      <HomeStyled>
        {Object.keys(user).map((key) => (
          <li>
            {key}
            :
            {' '}
            {user[key as keyof IUser]}
          </li>
        ))}
        <LogoutButton onClick={logoutHandler} variant="outlined">Logout</LogoutButton>
      </HomeStyled>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const HomeStyled = styled.div``;

const LogoutButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Home;
