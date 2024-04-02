"use client";

import { Button, Typography } from "@mui/material";
import { FormContainer, RadioButtonGroup, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GroupForm } from "@/app/(components)/GroupForm";

export default function GroupCreatePage() {
  
  return (
    // <FormContainer onSuccess={submit}>
    //   <Grid container spacing={2} margin={4}>
    //     <Grid xs={12}>
    //       <Typography variant="h5" gutterBottom>
    //         Datos generales del Grupo/Ministerio
    //       </Typography>
    //     </Grid>
    //     <Grid xs={12}>
    //       <TextFieldElement fullWidth name="name" label="Nombre" required />
    //     </Grid>
    //     <Grid xs={12}>
    //       <TextFieldElement
    //         fullWidth
    //         name="description"
    //         label="Descripción"
    //         multiline
    //         rows={4}
    //         required
    //       />
    //     </Grid>
    //     <Grid>
    //       <RadioButtonGroup
    //         label="Tipo"
    //         name="type"
    //         options={[
    //           {
    //             id: "1",
    //             label: "Grupo",
    //           },
    //           {
    //             id: "2",
    //             label:"Ministerios",
    //           }
    //         ]}
    //         row
    //       />
    //     </Grid>
    //     <Grid xs={12}>
    //       <Button type="submit" variant="contained">
    //         Guardar
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </FormContainer>
    <GroupForm/>
  );
}
