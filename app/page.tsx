"use client";
import { Button } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export default function Home() {
  return (
    <FormContainer
      defaultValues={{ name: "" }}
      onSuccess={(data) => console.log(data)}
    >
      <TextFieldElement name="name" label="Name" required />
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
}
