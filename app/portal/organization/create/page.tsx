"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { OrganizationForm } from "../OrganizationForm";
import MenuDrawer2 from "../../MenuDrawer2";

export default function OrganizationCreatePage() {
  const getApi = useAuthApi();
  const router = useRouter();
  const submit = async (data: any) => {
    const api = await getApi();
    const response = await api.post("organizations", data);
    alert("Guardado :)");
    router.push("/portal/" + response.data.id);
  };

  return (
    <MenuDrawer2>
      <OrganizationForm
        title="Registrar Datos de la Organización"
        submit={submit}
      />
    </MenuDrawer2>
  );
}
