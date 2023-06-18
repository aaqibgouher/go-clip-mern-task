// reducer.js

import {
  COMPANY_DETAILS_USER_FAILURE,
  COMPANY_DETAILS_USER_REQUEST,
  COMPANY_DETAILS_USER_SUCCESS,
} from "../../actions/dashboard/dashboardActions";

const initialState = {
  loading: false,
  companyDetails: null,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMPANY_DETAILS_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        companyDetails: action.payload.data,
      };
    case COMPANY_DETAILS_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
