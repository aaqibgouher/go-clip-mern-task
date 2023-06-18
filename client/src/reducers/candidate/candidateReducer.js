// reducer.js

import {
  CANDIDATE_LIST_REQUEST,
  CANDIDATE_LIST_SUCCESS,
  CANDIDATE_LIST_FAILURE,
  ADD_CANDIDATE_REQUEST,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE,
} from "../../actions/candidate/candidateActions";

const initialState = {
  loading: false,
  candidates: [],
  error: null,
};

const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANDIDATE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CANDIDATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        candidates: action.payload.data,
      };
    case CANDIDATE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CANDIDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_CANDIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default candidateReducer;
