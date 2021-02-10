import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';

import useForm from '@/utils/hooks/useForm';

import { signUpAction } from '@/store/actions/auth';

const policies = [
  'at least 8 characters',
  'at least 1 number',
  'at least 1 special character',
];

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    await dispatch(signUpAction(data, history));

    setLoading(false);
  }, [data, dispatch, history]);

  return (
    <Page>
      <Wrapper onSubmit={handleSubmit}>
        <Typography variant="h2" align="center" color="primary">ZERO5</Typography>
        <TextField value={data.name} onChange={setData('name')} label="Name" variant="filled" color="primary" />
        <TextField value={data.email} onChange={setData('email')} label="Email" type="email" name="email" autoComplete="on" variant="filled" color="primary" />
        <TextField value={data.password} onChange={setData('password')} label="Password" type="password" variant="filled" color="primary" />
        <PasswordTypography variant="body2">Password must have</PasswordTypography>
        <List>
          {policies.map((title) => (
            <li><Typography variant="body2">{title}</Typography></li>
          ))}
        </List>
        <SubmitButton variant="contained" color="primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up' }</SubmitButton>
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

const PasswordTypography = styled(Typography)`
  margin-top: 10px;
`;

const List = styled.ul`
  padding: 0 0 0 16px;
  margin: 0;
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
