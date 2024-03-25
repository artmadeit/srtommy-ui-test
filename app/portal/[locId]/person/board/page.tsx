"use client";

import { PeopleLayout } from "../PeopleLayout";
import Board from "./board";
import { personMap } from "./data";

export default function PersonBoardPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  return (
    <PeopleLayout value="board" locId={locId}>
      <Board initial={personMap}></Board>
    </PeopleLayout>
  );
}
