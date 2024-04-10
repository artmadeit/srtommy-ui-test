"use client";

import useSWR from "swr";
import { GroupDetail, GroupForm } from "../GroupForm";
import Loading from "@/app/(components)/Loading";
import { PersonDetail, PersonDetailWithId } from "../../../person/Person";
import { fullName } from "../../../person/PersonTable";

export type GroupMembers = {
  LEADER: PersonDetailWithId[];
  IS_PART_OF: PersonDetailWithId[];
};

export default function GroupDetailPage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const { data: group, isLoading } = useSWR<GroupDetail>(
    `/organizations/${id}`
  );

  const { data: members } = useSWR<GroupMembers>(
    `/organizations/locations/childs/${id}/members`
  );

  if (isLoading) return <Loading />;
  if (!group || !members) return <div>Not found</div>;

  const initialValues: GroupDetail = {
    name: group.name,
    description: group.description,
    type: group.type,
    members: members.IS_PART_OF.map((x) => {
      return {
        id: x.id,
        // label: x.firstName + " " + x.lastName,
        label: fullName(x),
      };
    }),
    leaders: members.LEADER.map((x) => {
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
