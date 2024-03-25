import type { Author, PersonMap } from "./types";

const jake: Author = {
  id: "1",
  name: "Jake",
  url: "http://adventuretime.wikia.com/wiki/Jake",
};

const BMO: Author = {
  id: "2",
  name: "BMO",
  url: "http://adventuretime.wikia.com/wiki/BMO",
};

const finn: Author = {
  id: "3",
  name: "Finn",
  url: "http://adventuretime.wikia.com/wiki/Finn",
};

export const personMap: PersonMap = {
  Visitante: [jake, finn],
  "En progreso de ser miembro": [BMO],
  Miembro: [],
};
