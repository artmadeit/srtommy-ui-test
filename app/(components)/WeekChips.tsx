import { Chip, Stack } from "@mui/material";

type WeekChipProps = {
  onChange: (chipsValue: string[]) => void;
  chipsValue: string[];
};

// const chipsValue = ["D", "L", "M", "X", "J", "V", "S"];

export const WeekChips = ({ onChange, chipsValue }: WeekChipProps) => {
  const toggle = (weekDay: string) => {
    if (chipsValue.includes(weekDay)) {
      onChange(chipsValue.filter((x) => x !== weekDay));
    } else {
      onChange([...chipsValue, weekDay]);
    }
  };

  console.log(chipsValue)
  return (
    <Stack direction="row" spacing={1.5}>
      <Chip
        label="D"
        size="small"
        // sx={chipSX}
        color={chipsValue.includes("D") ? "primary" : "default"}
        onClick={() => toggle("D")}
      />
      <Chip
        label="L"
        size="small"
        // sx={chipSX}
        color={chipsValue.includes("L") ? "primary" : "default"}
        onClick={() => toggle("L")}
      />
      <Chip
        label="M"
        size="small"
        color={chipsValue.includes("M") ? "primary" : "default"}
        onClick={() => toggle("M")}
      />
      <Chip
        label="X"
        size="small"
        color={chipsValue.includes("X") ? "primary" : "default"}
        onClick={() => toggle("X")}
      />
      <Chip
        label="J"
        size="small"
        color={chipsValue.includes("J") ? "primary" : "default"}
        onClick={() => toggle("J")}
      />
      <Chip
        label="V"
        size="small"
        color={chipsValue.includes("V") ? "primary" : "default"}
        onClick={() => toggle("V")}
      />
      <Chip
        label="S"
        size="small"
        color={chipsValue.includes("S") ? "primary" : "default"}
        onClick={() => toggle("S")}
      />
    </Stack>
  );
};
