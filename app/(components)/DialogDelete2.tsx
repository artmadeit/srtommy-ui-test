import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type DialogDelete2Props = {
  open: boolean;
  close: () => void;
  onDelete: () => void;
};

export const DialogDelete2 = ({ open, close, onDelete }: DialogDelete2Props) => {
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
