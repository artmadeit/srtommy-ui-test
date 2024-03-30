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

export const getLabel = (column: string) => {
  return (
    {
      VISITOR: "Visitante",
      IN_PROGRESS: "En progreso de ser miembro",
      MEMBER: "Miembro",
    }[column] || "-"
  );
};

export const personMap: PersonMap = {
  VISITOR: [jake, finn],
  IN_PROGRESS: [BMO],
  MEMBER: [],
};
