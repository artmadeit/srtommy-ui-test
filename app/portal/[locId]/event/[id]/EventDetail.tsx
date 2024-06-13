"use client";
import { PersonDetailWithId } from "../../person/Person";

export type EventDetail = {
  id: number;
  title: string;
  daysOfWeek: number[];
  start: Date;
  end: Date;
  isACourse: Boolean;
  address: string;
  description: string;
  speakers: PersonDetailWithId[];
  recurrentEvent?: EventDetail;
};
