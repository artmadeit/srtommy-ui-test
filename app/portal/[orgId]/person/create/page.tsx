"use client";

import { useAuthApi } from "@/app/(api)/api";
import { usePathname, useRouter } from "next/navigation";
import { PersonForm } from "@/app/(components)/PersonForm";

export default function CreatePerson({
  params,
}: {
  params: { orgId: number };
}) {
  const getApi = useAuthApi();
  const router = useRouter();
  const { orgId } = params;

  return (
    <PersonForm
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "+51",
        //  age: null,
        //  birthdate: null,
      }}
      submit={async (data) => {
        const api = await getApi();
        await api.post("people", { ...data, organizationId: orgId });
        alert("Guardado :)");
        router.push(`/portal/${orgId}/person`);
      }}
    />
  );
}
