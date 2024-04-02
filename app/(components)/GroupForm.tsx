import { Button, Typography } from "@mui/material";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export type GroupDetail = {
  name: string;
  description: string;
  type: "GROUP" | "MINISTRY";
};

type GroupFormContext = {
  initialValues: GroupDetail;
  submit: (data: any) => Promise<void>;
};

export const GroupForm = ({ submit, initialValues }: GroupFormContext) => {
  const formContext = useForm({
    defaultValues: initialValues,
  });

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos generales del Grupo/Ministerio
          </Typography>
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="name" label="Nombre" required />
        </Grid>
        <Grid xs={12}>
          <TextFieldElement
            fullWidth
            name="description"
            label="Descripción"
            multiline
            rows={4}
          />
        </Grid>
        <Grid>
          <RadioButtonGroup
            label="Tipo"
            name="type"
            options={[
              {
                id: "GROUP",
                label: "Grupo",
              },
              {
                id: "MINISTRY",
                label: "Ministerios",
              },
            ]}
            row
          />
        </Grid>
        <Grid xs={12}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
};
