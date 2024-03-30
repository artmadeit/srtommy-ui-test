export type PersonDetailBase = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age?: number;
  birthdate?: Date | null;
};

export type PersonDetail = PersonDetailBase & {
  hasBeenBaptized?: boolean;
};

export type PersonDetailWithId = PersonDetail & { id: number };
