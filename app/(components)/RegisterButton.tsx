import { Fab } from "@mui/material";
import { ReactNode } from "react";

type IconsProps = {
  icon: ReactNode;
};

export const RegisterButton = ({ icon }: IconsProps) => {
  return (
    <Fab
      aria-labelledby="create"
      sx={{
        boxShadow: "none",
        border: "1px solid #7C2BED",
        borderRadius: "20%",
      }}
    >
      {icon}
    </Fab>
  );
};
