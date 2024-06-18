import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type DialogDeleteConfirmationProps = {
  open: boolean;
  close: () => void;
  onDelete: () => void;
};

export const DialogDeleteConfirmation = ({ open, close, onDelete }: DialogDeleteConfirmationProps) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Deseas eliminar</DialogTitle>
      <DialogContent>
        Recuerda que una vez eliminado no podrás recuperarlo
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={onDelete}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};
