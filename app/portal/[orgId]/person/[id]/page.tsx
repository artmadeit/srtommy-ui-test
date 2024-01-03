"use-client";

import { PersonForm } from "@/app/(components)/PersonForm";
import useSWR from "swr";
import { PersonDetail } from "../Person";

export default function PersonEdit() {
  // const id = params;

  // const {data: person, isLoading} = useSWR<PersonDetail>(`/people/${id}`);

  // if(isLoading) return <div>Loading...</div>

  return (
    <div>
      {/* <PersonForm
        initialValues={person}
        submit={async () => await console.log("Click =D")}
      /> */}
      Editar
    </div>
  );
}
