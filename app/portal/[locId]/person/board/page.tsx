"use client";

import useSWR from "swr";
import { PeopleLayout } from "../PeopleLayout";
import Board from "./board";
import { Author, PersonMap } from "./types";
import Loading from "@/app/(components)/Loading";
import { PersonDetailWithId } from "../Person";

type Accountability = {
  child: PersonDetailWithId;
  // organization: Organization;
  type: string;
};

const emptyPersonMap: PersonMap = {
  VISITOR: [],
  MEMBERSHIP_IN_PROGRESS: [],
  MEMBER: [],
};

export default function PersonBoardPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  const { data: accountabilities, isLoading } = useSWR<Accountability[]>(
    `organizations/${locId}/member-state`
  );

  const personMap: PersonMap = accountabilities
    ? accountabilities.reduce(
        (prev, currentValue) => {
          const author: Author = {
            id: String(currentValue.child.id),
            name:
              currentValue.child.firstName + " " + currentValue.child.lastName,
          };

          if (!prev[currentValue.type].map((x) => x.id).includes(author.id)) {
            prev[currentValue.type].push(author);
          }

          return prev;
        },
        { ...emptyPersonMap }
      )
    : { ...emptyPersonMap };

  if (isLoading) return <Loading></Loading>;
  return (
    <PeopleLayout value="board" locId={locId}>
      <Board initial={personMap}></Board>
    </PeopleLayout>
  );
}
