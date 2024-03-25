import type { Author, PersonMap } from "./types";
const finnImg = "/finn-min.png";
const bmoImg = "/bmo-min.png";
const jakeImg = "/jake-min.png";

const jake: Author = {
  id: "1",
  name: "Jake",
  url: "http://adventuretime.wikia.com/wiki/Jake",
  avatarUrl: jakeImg,
};

const BMO: Author = {
  id: "2",
  name: "BMO",
  url: "http://adventuretime.wikia.com/wiki/BMO",
  avatarUrl: bmoImg,
};

const finn: Author = {
  id: "3",
  name: "Finn",
  url: "http://adventuretime.wikia.com/wiki/Finn",
  avatarUrl: finnImg,
};

export const personMap: PersonMap = {
  Visitante: [jake, finn],
  "En progreso de ser miembro": [BMO],
  Miembro: [],
};
