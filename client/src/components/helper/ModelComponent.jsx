import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { hideDialog } from "../../actions/helper/helperActions";

const ModelComponent = () => {
  const dispatch = useDispatch();
  const registrationState = useSelector((state) => state);

  const handleDialogClose = () => {
    dispatch(hideDialog()); // Hide the dialog box
  };

  return (
    <>
      {registrationState.helperReducer.showDialog && (
        <Dialog open onClose={handleDialogClose}>
          <DialogTitle>Registration Message</DialogTitle>
          <DialogContent>
            {typeof registrationState.helperReducer.dialogMessage ===
            "string" ? (
              <DialogContentText>
                {registrationState.helperReducer.dialogMessage}
              </DialogContentText>
            ) : (
              registrationState.helperReducer.dialogMessage.map(
                (msg, index) => (
                  <DialogContentText key={index}>{msg}</DialogContentText>
                )
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ModelComponent;
