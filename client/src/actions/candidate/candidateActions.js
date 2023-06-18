// actions.js

import { addCandidate, getCandidates } from "../../api/candidate/candidateApi";
import { showDialog } from "../helper/helperActions";

export const CANDIDATE_LIST_REQUEST = "CANDIDATE_LIST_REQUEST";
export const CANDIDATE_LIST_SUCCESS = "CANDIDATE_LIST_SUCCESS";
export const CANDIDATE_LIST_FAILURE = "CANDIDATE_LIST_FAILURE";

export const ADD_CANDIDATE_REQUEST = "ADD_CANDIDATE_REQUEST";
export const ADD_CANDIDATE_SUCCESS = "ADD_CANDIDATE_SUCCESS";
export const ADD_CANDIDATE_FAILURE = "ADD_CANDIDATE_FAILURE";

export const candidateListRequest = () => ({
  type: CANDIDATE_LIST_REQUEST,
});

export const candidateListSuccess = (data) => ({
  type: CANDIDATE_LIST_SUCCESS,
  payload: data,
});

export const candidateListFailure = (error) => ({
  type: CANDIDATE_LIST_FAILURE,
  payload: error,
});

export const addCandidateRequest = () => ({
  type: ADD_CANDIDATE_REQUEST,
});

export const addCandidateSuccess = (data) => ({
  type: ADD_CANDIDATE_SUCCESS,
  payload: data,
});

export const addCandidateFailure = (error) => ({
  type: ADD_CANDIDATE_FAILURE,
  payload: error,
});

export const getCandidatesAction = () => async (dispatch) => {
  dispatch(candidateListRequest());

  try {
    const response = await getCandidates();
    dispatch(candidateListSuccess(response));
    // dispatch(showDialog(response.message));
    return response;
  } catch (error) {
    console.log(7, error);
    dispatch(candidateListFailure(error));
    // dispatch(showDialog(error.message));
  }
};

export const addCandidateAction = (candidateObj) => async (dispatch) => {
  dispatch(addCandidateRequest());

  try {
    const response = await addCandidate(candidateObj);
    dispatch(addCandidateSuccess(response));
    dispatch(showDialog(response.message));
    return response;
  } catch (error) {
    console.log(7, error);
    dispatch(addCandidateFailure(error));
    dispatch(showDialog(error.message));
  }
};
