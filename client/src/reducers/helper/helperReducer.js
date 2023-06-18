// reducer.js

import { SHOW_DIALOG, HIDE_DIALOG } from "../../actions/helper/helperActions";

const initialState = {
  showDialog: false, // New state for the dialog box
  dialogMessage: null, // New state for the dialog message,
  statusCode: null,
};

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG: // Action to show the dialog box
      return {
        ...state,
        showDialog: true,
        dialogMessage: action.payload,
        statusCode: action.statusCode,
      };
    case HIDE_DIALOG: // Action to hide the dialog box
      return {
        ...state,
        showDialog: false,
        dialogMessage: null,
      };
    default:
      return state;
  }
};

export default helperReducer;
