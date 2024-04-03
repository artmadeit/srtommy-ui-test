"use client";

import useSWR from "swr";
import { GroupDetail, GroupForm } from "../GroupForm";
import Loading from "@/app/(components)/Loading";

export default function GroupDetailPage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const { data: group, isLoading } = useSWR<GroupDetail>(
    `/organizations/${id}`
  );
  if (isLoading) return <Loading />;
  if (!group) return <div>Not found</div>;

  return (
    <GroupForm
      locId={locId}
      initialValues={group}
      submit={async (data) => console.log(data)}
    />
  );
}
