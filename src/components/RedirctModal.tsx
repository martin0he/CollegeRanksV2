import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

interface RedirectModalProps {
  open: boolean;
  onClose: () => void;
}

const RedirectModal = ({ open, onClose }: RedirectModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "12px" } }}
    >
      <DialogTitle>Log in to review your school</DialogTitle>
      <DialogActions>
        <Link to="/account">
          <IconButton>
            <LoginIcon color="primary" />
          </IconButton>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default RedirectModal;
