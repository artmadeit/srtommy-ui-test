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
};

export const DialogDelete2 = ({ open, close }: DialogDelete2Props) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Deseas eliminar</DialogTitle>
      <DialogContent>
        Recuerda que una vez eliminado no podrás recuperarlo
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={() => console.log("Eliminando")}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};
