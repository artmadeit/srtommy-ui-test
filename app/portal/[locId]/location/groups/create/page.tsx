"use client";

import React from "react";
import { GroupForm } from "../GroupForm";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function GroupCreatePage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  return (
    <GroupForm
      locId={locId}
      initialValues={{
        name: "",
        description: "",
        type: "GROUP",
        members: [],
        leaders: [],
      }}
      submit={async (values) => {
        const data = {
          name: values.name,
          description: values.description,
          type: values.type,
          parentId: locId,
          leaderIds: values.leaders.map((x) => x.id),
          memberIds: values.members.map((x) => x.id),
        };

        const response = await getApi().then((api) =>
          api.post("/organizations/locations/childs", data)
        );
        alert.showMessage("Guardado exitosamente");
        router.push(`/portal/${locId}/location`);
      }}
    />
  );
}
