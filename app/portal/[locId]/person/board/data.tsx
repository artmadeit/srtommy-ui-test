import type { Author, Quote, QuoteMap } from "./types";
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

const authors: Author[] = [jake, BMO, finn];

const quotes: Quote[] = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    author: BMO,
  },
  {
    id: "2",
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    author: jake,
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    author: jake,
  },
  {
    id: "4",
    content: "Is that where creativity comes from? From sad biz?",
    author: finn,
  },
  {
    id: "5",
    content: "Homies help homies. Always",
    author: finn,
  },
  {
    id: "8",
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
  },
  {
    id: "9",
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
  },
];

const getByAuthor = (author: Author, items: Quote[]): Quote[] =>
  items.filter((quote: Quote) => quote.author === author);

export const authorQuoteMap: QuoteMap = {
  TODO: getByAuthor(jake, quotes),
  DOING: getByAuthor(finn, quotes),
  DONE: getByAuthor(BMO, quotes),
};
