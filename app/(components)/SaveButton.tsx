import { Button } from "@mui/material";

type SaveButtonProps = {
  name: string;
  onClick?: () => void;
};

export const SaveButton = ({ name, onClick }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      sx={{
        padding: "6px 50px",
        color: "#000000DE",
        border: "1px solid #7C2BED",
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
