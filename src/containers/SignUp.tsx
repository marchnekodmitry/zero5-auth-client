import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';

import useForm from '@/utils/hooks/useForm';

import { signInAction, signUpAction } from '@/store/actions/auth';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(signUpAction(data));
    await dispatch(signInAction({
      email: data.email,
      password: data.password,
    }));

    history.push('/');
  }, [data, dispatch, history]);

  return (
    <Page>
      <Wrapper onSubmit={handleSubmit}>
        <Typography variant="h2" align="center" color="primary">CLIENT</Typography>
        <TextField value={data.name} onChange={setData('name')} label="Name" variant="filled" color="primary" />
        <TextField value={data.email} onChange={setData('email')} label="Email" type="email" name="email" autoComplete="on" variant="filled" color="primary" />
        <TextField value={data.password} onChange={setData('password')} label="Password" type="password" variant="filled" color="primary" />
        <SubmitButton variant="contained" color="primary" type="submit">Sign Up</SubmitButton>
        <TextWrapper>
          <span>Already have an account?</span>
          {' '}
          <Link to="/sign-in">Sign In</Link>
        </TextWrapper>
      </Wrapper>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const SubmitButton = styled(Button)`
  width: 200px;
  margin: 10px auto 0 auto;
`;

const TextWrapper = styled.div`
  margin-top: 10px;

  & > * {
    display: inline-block;
  }
`;

export default SignUp;
