import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const RegisterButton = () => {
  return (
    <>
      <Fab
        aria-labelledby="create"
        sx={{
          boxShadow: "none",
          border: "1px solid #7C2BED",
          borderRadius: "20%",
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
