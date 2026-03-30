import { Fab, FabProps } from "@mui/material";
import { forwardRef, ReactNode } from "react";

type IconsProps = {
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
} & Partial<FabProps>;

export const RegisterButton = forwardRef<HTMLButtonElement, IconsProps>(
  ({ icon, ariaLabel, onClick, ...props }, ref) => {
    return (
      <Fab
        {...props}
        ref={ref}
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
  },
);
