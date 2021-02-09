import { IUser } from '@/api/models/user';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface AuthState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  user: IUser | null;
  passwordChallenge: {
    email: string;
    password: string;
  } | null;
}

const initialState: AuthState = {
  isPending: false,
  isResolved: false,
  isRejected: false,
  user: null,
  passwordChallenge: null,
};

export class AuthReducer extends ImmerReducer<AuthState> {
  setIsPending() {
    this.draftState.isPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
  }

  setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isResolved = true;
    this.draftState.isRejected = false;
  }

  setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isResolved = false;
    this.draftState.isRejected = true;
  }

  setUser(user: IUser) {
    this.draftState.user = user;
  }

  logout() {
    this.draftState.isPending = false;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
    this.draftState.user = null;
    this.draftState.passwordChallenge = null;
  }

  setPasswordChallenge(data: {
    email: string;
    password: string;
  }) {
    this.draftState.passwordChallenge = data;
  }
}

export default createReducerFunction(AuthReducer, initialState);
