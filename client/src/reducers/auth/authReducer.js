// reducer.js

import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../../actions/auth/authActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
