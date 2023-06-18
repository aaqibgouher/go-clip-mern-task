import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import snackbarReducer from "../reducers/snackbarReducer";
import authReducer from "../reducers/auth/authReducer";
import helperReducer from "../reducers/helper/helperReducer";
import dashboardReducer from "../reducers/dashboard/dashboardReducer";
import candidateReducer from "../reducers/candidate/candidateReducer";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  authReducer,
  helperReducer,
  dashboardReducer,
  candidateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
