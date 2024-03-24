import { DraggableId, DraggableLocation } from "@hello-pangea/dnd";

export type Id = string;

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
};

export type Dragging = {
  id: DraggableId;
  location: DraggableLocation;
};

export type PersonMap = {
  [key: string]: Author[];
};

export type Task = {
  id: Id;
  content: string;
};
