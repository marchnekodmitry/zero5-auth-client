import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { AuthState } from '@/store/reducers/auth';

const selectAuth = (state: State) => state.authReducer;

export const selectAuthState: Selector<State, AuthState> = createSelector(
  selectAuth,
  (loginState) => loginState,
);

export const selectAuthIsPending: Selector<State, boolean> = createSelector(
  selectAuth,
  ({ isPending }) => isPending,
);

export const selectAuthIsResolved: Selector<State, boolean> = createSelector(
  selectAuth,
  ({ isResolved }) => isResolved,
);

export const selectAuthIsReject: Selector<State, boolean> = createSelector(
  selectAuth,
  ({ isRejected }) => isRejected,
);

export const selectAuthUser = createSelector(
  selectAuth,
  ({ user }) => user,
);
