import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';

import { signInAction } from '@/store/actions/auth';
import useInput from '@/utils/hooks/useInput';
import { changeDefaultPassword } from '@/api/auth';
import { selectPasswordChallenge } from '@/store/selectors/auth';

const Code: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = useInput('');

  const passwordChallenge = useSelector(selectPasswordChallenge);

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await changeDefaultPassword({
        ...passwordChallenge!,
        oldPassword: code,
      });
      await dispatch(signInAction(passwordChallenge!, history));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [code, dispatch, history, passwordChallenge]);

  return (
    <Page>
      <Wrapper onSubmit={handleSubmit}>
        <Typography variant="h2" align="center" color="primary">ZERO5</Typography>
        <TextField value={code} onChange={setCode} label="Code" variant="filled" color="primary" />
        <SubmitButton variant="contained" color="primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Confirm' }</SubmitButton>
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

export default Code;
