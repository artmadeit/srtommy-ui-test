import { Fab } from "@mui/material";
import { ReactNode } from "react";

type IconsProps = {
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
};

export const RegisterButton = ({ icon, ariaLabel, onClick }: IconsProps) => {
  return (
    <Fab
      aria-labelledby={ariaLabel}
      sx={{
        boxShadow: "none",
        border: "1px solid #7C2BED",
        borderRadius: "20%",
      }}
      onClick={onClick}
    >
      {icon}
    </Fab>
  );
};
