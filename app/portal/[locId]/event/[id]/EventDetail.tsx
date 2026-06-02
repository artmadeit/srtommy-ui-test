"use client";
// import { PersonDetailWithId } from "../../person/Person";
import { PersonResponse } from "../../person/Person";
// ../portal/[locId]/person/Person

export type EventDetail = {
  id: number;
  title: string;
  daysOfWeek: number[];
  start: Date;
  end: Date;
  isACourse: Boolean;
  address: string;
  description: string;
  speakers: PersonResponse[];
  endRecur?: Date;
  recurrentEvent?: EventDetail;
};
