// actions.js

import { loginUser, registerUser } from "../../api/auth/authApi";
import { showDialog } from "../helper/helperActions";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const registerUserAction = (userData) => async (dispatch) => {
  dispatch(registerUserRequest());

  try {
    const response = await registerUser(userData);
    dispatch(registerUserSuccess(response));
    dispatch(showDialog(response.message));
    return response;
  } catch (error) {
    console.log(7, error);
    dispatch(registerUserFailure(error));
    dispatch(showDialog(error.message));
  }
};

export const loginUserAction = (userData) => async (dispatch) => {
  dispatch(loginUserRequest());

  try {
    const response = await loginUser(userData);
    dispatch(loginUserSuccess(response));
    dispatch(showDialog(response.message));
    return response;
  } catch (error) {
    console.log(8, error);
    dispatch(loginUserFailure(error));
    dispatch(showDialog(error.message));
  }
};
