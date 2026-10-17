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
        padding: "10px 40px",
        // #2563EB on white is 5.2:1 (WCAG AA needs 4.5:1 at this font size).
        background: "#2563EB",
        color: "#fff",
        fontSize: "12px",
        "&:hover": { background: "#1D4ED8" },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
