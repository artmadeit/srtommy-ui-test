"use client";

import { PeopleLayout } from "../PeopleLayout";
import Board from "./board";
import { authorQuoteMap } from "./data";

export default function PersonBoardPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  return (
    <PeopleLayout value="board">
      <Board initial={authorQuoteMap}></Board>
    </PeopleLayout>
  );
}
