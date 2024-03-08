export type PersonDetailBase = {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age?: number;
  birthdate?: Date | null;
};

export type PersonDetail = PersonDetailBase & {
  hasBeenBaptized?: boolean;
};
