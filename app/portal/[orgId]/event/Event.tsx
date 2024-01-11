type Option = {
  id: number;
  label: string;
};

export type EventDetail = {
  name: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  address: string;
  description: string;
  speakers: Option[];
};
