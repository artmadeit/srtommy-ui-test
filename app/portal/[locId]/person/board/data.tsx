import type { Author, PersonMap } from "./types";

const jake: Author = {
  id: "1",
  name: "Jake",
};

const BMO: Author = {
  id: "2",
  name: "BMO",
};

const finn: Author = {
  id: "3",
  name: "Finn",
};

export const personMap: PersonMap = {
  Visitante: [jake, finn],
  "En progreso de ser miembro": [BMO],
  Miembro: [],
};
