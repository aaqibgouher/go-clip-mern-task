// actions.js

import { getCompanyDetails } from "../../api/dashboard/dashboardApi";

// import { loginUser, registerUser } from "../../api/auth/authApi";
// import { showDialog } from "../helper/helperActions";

export const COMPANY_DETAILS_USER_REQUEST = "COMPANY_DETAILS_USER_REQUEST";
export const COMPANY_DETAILS_USER_SUCCESS = "COMPANY_DETAILS_USER_SUCCESS";
export const COMPANY_DETAILS_USER_FAILURE = "COMPANY_DETAILS_USER_FAILURE";

export const companyDetailUserRequest = () => ({
  type: COMPANY_DETAILS_USER_REQUEST,
});

export const companyDetailUserSuccess = (data) => ({
  type: COMPANY_DETAILS_USER_SUCCESS,
  payload: data,
});

export const companyDetailUserFailure = (error) => ({
  type: COMPANY_DETAILS_USER_FAILURE,
  payload: error,
});

export const getCompanyDetailAction = () => async (dispatch) => {
  dispatch(companyDetailUserRequest());

  try {
    const response = await getCompanyDetails();
    dispatch(companyDetailUserSuccess(response));
    // dispatch(showDialog(response.message));
    return response;
  } catch (error) {
    console.log(7, error);
    dispatch(companyDetailUserFailure(error));
    // dispatch(showDialog(error.message));
  }
};
