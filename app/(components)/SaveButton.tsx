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
        // padding: "6px 50px",
        padding: "10px 40px",
        background: "#3B82F6",
        color: "#fff",
        fontSize: "12px",
        // color: "#000000DE",
        // border: "1px solid #7C2BED",

        // "&:hover": {
        //   color: "#fff",
        //   backgroundColor: "#7C2BED",
        // }
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
