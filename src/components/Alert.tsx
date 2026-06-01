import { Snackbar, Alert } from "@mui/material";

type Props = {
  message: string;
  duration: number;
  variant: "filled" | "outlined" | "standard";
  severity: "success" | "error" | "info" | "warning";
  width?: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  showAlert: boolean;
  setShowAlert: (arg: boolean) => void;
};

function AlertPopup({
  message,
  duration,
  variant,
  severity,
  width = "100%",
  vertical,
  horizontal,
  showAlert,
  setShowAlert,
}: Props) {
  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={duration}
      onClose={() => setShowAlert(false)}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={() => setShowAlert(false)}
        severity={severity}
        variant={variant}
        sx={{ width, borderRadius: 1.5 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertPopup;
