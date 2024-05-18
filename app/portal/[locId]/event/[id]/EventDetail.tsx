"use client";
import { PersonDetail } from "../../person/Person";

export type EventDetail = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  address: string;
  description: string;
  speakers: PersonDetail[];
};
