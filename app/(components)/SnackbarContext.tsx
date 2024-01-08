import { Snackbar } from "@mui/material";
import React, { createContext } from "react";

export const SnackbarContext = createContext({
  message: "",
  showMessage: (message: string) => {},
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setAlertMessage("");
  };

  const ShowAlertMessage = (message: string) => setAlertMessage(message);

  return (
    <SnackbarContext.Provider
      value={{
        message: alertMessage,
        showMessage: ShowAlertMessage,
      }}
    >
      {children}
      <Snackbar
        open={!!alertMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
      />
    </SnackbarContext.Provider>
  );
};
