"use client";

import { PeopleLayout } from "./PeopleLayout";
import { PersonTable } from "./PersonTable";

export default function PersonListPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  return (
    <PeopleLayout value="table">
      <PersonTable locId={locId} />
    </PeopleLayout>
  );
}
