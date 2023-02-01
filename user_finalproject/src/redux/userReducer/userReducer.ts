import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginModel, RegisterModel, UserModel } from '../../Models/UserModel';
import {
  ACCESS_TOKEN,
  getStorageJson,
  http,
  setStorage,
  setStorageJson,
  USER_LOGIN,
} from '../../util/config';
import { AppDispatch } from '../configureStore';
import { toast } from 'react-toastify';
import { history } from '../..';

type UserState = {
  userLogin: LoginModel;
  userDetail: UserModel | null;
};
const initialState: UserState = {
  userLogin: getStorageJson(USER_LOGIN),
  userDetail: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state: UserState, action: PayloadAction<LoginModel>) => {
      state.userLogin = action.payload;
    },
    getUserDetailAction: (
      state: UserState,
      action: PayloadAction<UserModel>
    ) => {
      state.userDetail = action.payload;
    },
    updateUserAction: (state: UserState, action: PayloadAction<UserModel>) => {
      const newUser = action.payload;
      state.userDetail = { ...state.userDetail, ...newUser };
    },
  },
});

export const { loginAction, getUserDetailAction, updateUserAction } =
  userReducer.actions;

export default userReducer.reducer;

export const registerApi = (user: RegisterModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      await http.post('/api/auth/signup', user);

      toast.success('Registration successfully');
      history.push('/login');
    } catch (error) {
      toast.error('Email already registered');
    }
  };
};

export const loginApi = (user: LoginModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await http.post('/api/auth/signin', user);
      const content: LoginModel = res.data.content.user;
      const action: PayloadAction<LoginModel> = loginAction(content);
      setStorage(ACCESS_TOKEN, res.data.content.token);
      setStorageJson(USER_LOGIN, res.data.content.user);
      dispatch(action);
      toast.success('Login successful');
      history.push('/');
    } catch (error) {
      toast.error('Login fail. Try again');
    }
  };
};

export const getUserByIdApi = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/api/users/${userId}`);
      const content: UserModel = result.data.content;
      const action: PayloadAction<UserModel> = getUserDetailAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserApi = (userId: number, user: UserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(`/api/users/${userId}`, user);
      const action: PayloadAction<UserModel> = updateUserAction(user);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
