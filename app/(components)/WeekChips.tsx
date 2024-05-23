import { Chip, Stack } from "@mui/material";

type WeekChipProps = {
  onChange: (chipsValue: number[]) => void;
  chipsValue: number[];
};

export const WeekChips = ({ onChange, chipsValue }: WeekChipProps) => {
  const toggle = (weekDay: number) => {
    if (chipsValue.includes(weekDay)) {
      onChange(chipsValue.filter((x) => x !== weekDay));
    } else {
      onChange([...chipsValue, weekDay]);
    }
  };

  return (
    <Stack direction="row" spacing={1.5}>
      <Chip
        label="L"
        size="small"
        color={chipsValue.includes(1) ? "primary" : "default"}
        onClick={() => toggle(1)}
      />
      <Chip
        label="M"
        size="small"
        color={chipsValue.includes(2) ? "primary" : "default"}
        onClick={() => toggle(2)}
      />
      <Chip
        label="Mi"
        size="small"
        color={chipsValue.includes(3) ? "primary" : "default"}
        onClick={() => toggle(3)}
      />
      <Chip
        label="J"
        size="small"
        color={chipsValue.includes(4) ? "primary" : "default"}
        onClick={() => toggle(4)}
      />
      <Chip
        label="V"
        size="small"
        color={chipsValue.includes(5) ? "primary" : "default"}
        onClick={() => toggle(5)}
      />
      <Chip
        label="S"
        size="small"
        color={chipsValue.includes(6) ? "primary" : "default"}
        onClick={() => toggle(6)}
      />
      <Chip
        label="D"
        size="small"
        color={chipsValue.includes(0) ? "primary" : "default"}
        onClick={() => toggle(0)}
      />
    </Stack>
  );
};
