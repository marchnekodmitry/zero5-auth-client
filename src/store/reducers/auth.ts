import { IUser } from '@/api/models/user';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface AuthState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  user: IUser | null;
}

const initialState: AuthState = {
  isPending: false,
  isResolved: false,
  isRejected: false,
  user: null,
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
  }
}

export default createReducerFunction(AuthReducer, initialState);
