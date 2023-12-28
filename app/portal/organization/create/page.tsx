"use client";

import { Typography } from "@mui/material";
import { OrganizationForm } from "../OrganizationForm";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";

export default function OrganizationCreatePage() {
  const getApi = useAuthApi();
  const router = useRouter();
  const submit = async (data: any) => {
    const api = await getApi();
    await api.post("organizations", data);
    alert("Guardado :)");
    router.push("/portal");
  }

  return (
    <div>
      <OrganizationForm
        title="Registrar Datos de la Organización"
        submit={submit}
      />
    </div>
  );
}
