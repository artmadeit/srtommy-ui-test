import { Button } from "@mui/material";

type ToogleButtonProps = {
  onChange: (eventType: number) => void;
  eventType: number;
};

export const ToogleButton = ({ onChange, eventType }: ToogleButtonProps) => {
  return (
    <>
      <Button
        sx={{
          mr: 1,
          mb: 1,
        }}
        variant={eventType === 0 ? "contained" : "outlined"}
        onClick={() => onChange(0)}
      >
        Evento
      </Button>
      <Button
        sx={{ mb: 1 }}
        variant={eventType === 1 ? "contained" : "outlined"}
        onClick={() => onChange(1)}
      >
        Curso
      </Button>
    </>
  );
};
