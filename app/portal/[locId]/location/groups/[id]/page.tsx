"use client";

import useSWR from "swr";
import { GroupInitialValues, GroupForm } from "../GroupForm";
import Loading from "@/app/(components)/Loading";
import { PersonDetailWithId } from "../../../person/Person";
import { fullName } from "../../../person/PersonTable";
import React from "react";

export type GroupMembers = {
  LEADER: PersonDetailWithId[];
  IS_PART_OF: PersonDetailWithId[];
};

export default function GroupDetailPage(props: {
  params: Promise<{ id: number; locId: number }>;
}) {
  const params = React.use(props.params);
  const { id, locId } = params;

  const { data: group, isLoading } = useSWR<GroupInitialValues>(
    `/organizations/${id}`
  );

  const { data: members } = useSWR<GroupMembers>(
    `/organizations/locations/childs/${id}/members`
  );

  if (isLoading) return <Loading />;
  if (!group || !members) return <div>Not found</div>;

  const initialValues: GroupInitialValues = {
    name: group.name,
    description: group.description,
    type: group.type,
    members: members.IS_PART_OF?.map((x) => {
      return {
        id: x.id,
        label: fullName(x),
      };
    }),
    leaders: members.LEADER?.map((x) => {
      return {
        id: x.id,
        label: fullName(x),
      };
    }),
  };

  return (
    <GroupForm
      locId={locId}
      initialValues={initialValues}
      submit={async (data) => console.log(data)}
    />
  );
}
