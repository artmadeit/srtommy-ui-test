"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import MenuDrawer2 from "../../MenuDrawer2";
import { OrganizationForm } from "@/app/(components)/OrganizationForm";

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
        initialValues={{
          name: "",
          address: "",
          phoneNumber: "+51",
        }}
        title="Registrar Datos de la Organización"
        submit={submit}
      />
    </MenuDrawer2>
  );
}
