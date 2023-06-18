// actions.js

export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";

export const showDialog = (message) => ({
  type: SHOW_DIALOG,
  payload: message,
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});
