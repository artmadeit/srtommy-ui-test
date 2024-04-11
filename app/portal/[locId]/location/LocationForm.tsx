"use client";

import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Autocomplete,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocationDetail } from "../Location";
import { TelFieldElement } from "../person/PersonForm";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";

type LocationFormProps = {
  title: string;
  submit: (data: any) => Promise<void>;
  initialValues: LocationDetail;
};

export const LocationForm = ({
  title,
  submit,
  initialValues,
}: LocationFormProps) => {
  // const fixedOptions = [churchRoles[0], churchRoles[1], churchRoles[2]];
  // const [value, setValue] = React.useState([...fixedOptions]);

  return (
    <FormContainer defaultValues={initialValues} onSuccess={submit}>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="name" label="Nombre" required fullWidth />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="address"
            label="Dirección"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TelFieldElement name="phoneNumber" />
        </Grid>
        <Grid xs={12} container alignItems="center">
          <Grid xs={12} sx={{ padding: "0px 0px 0px 8px" }}>
            <Typography variant="h6">Roles en la Iglesia:</Typography>
          </Grid>
          <Grid xs={12} sx={{ padding: "0px 0px 0px 8px" }}>
            <List>
              <ListItem sx={{ padding: "0px" }}>
                <ListItemIcon>
                  <CircleIcon style={{ color: "#000000" }} fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Pastor, Líder de alabanza, Ujier" />
              </ListItem>
            </List>
          </Grid>

          {/* <ul>
            <li>Pastor, Lider de alabanza, Ujier</li>            
          </ul> */}

          {/* <Grid xs={2}>
              <Typography>Otros roles:</Typography>
            </Grid> */}
          <Grid xs={12}>
            <Autocomplete
              freeSolo
              multiple
              options={[]}              
              // onChange={(event, newValue) => {
              //   setValue([
              //     ...fixedOptions,
              //     ...newValue.filter(
              //       (option) => fixedOptions.indexOf(option) === -1
              //     ),
              //   ]);
              // }}
              renderInput={(params) => (
                <TextFieldElement
                  name="roles"
                  label="Otros roles que desea añadir"
                  {...params}
                />
              )}
            />
          </Grid>
          {/* <Autocomplete
            multiple
            freeSolo={true}            
            name="roles"
            label="Roles"
            options={[]}
          /> */}
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

// const churchRoles = ["Pastor", "Líder de alabanza", "Ujier"];
