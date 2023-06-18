const initialState = {
  message: "",
  open: false,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return {
        ...state,
        message: action.payload,
        open: true,
      };
    case "HIDE_SNACKBAR":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
