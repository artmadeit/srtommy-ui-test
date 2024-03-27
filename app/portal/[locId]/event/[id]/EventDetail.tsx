"use client";
import { PersonDetail } from "../../person/Person";


export type EventDetail = {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  address: string;
  description: string;
  speakers: PersonDetail[];
};
