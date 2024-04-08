import { SpringPage } from "@/app/(api)/pagination";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import React from "react";
import { AutocompleteElement } from "react-hook-form-mui";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { PersonDetailWithId } from "../../person/Person";

type GroupAutocompleteProps = {
  name: string;
  label: string;
};

export const GroupAutocomplete = ({ name, label }: GroupAutocompleteProps) => {
  const [searchMember, setSearchMember] = React.useState("");
  const [searchTextDebounced] = useDebounce(searchMember, DEBOUNCE_WAIT_MS);
  const { data: people } = useSWR<SpringPage<PersonDetailWithId>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  return (
    <AutocompleteElement
      multiple
      autocompleteProps={{
        onInputChange: (_event, newInputValue) => {
          setSearchMember(newInputValue);
        },
      }}
      name={name}
      label={label}
      options={
        people?.content.map((x) => ({
          id: x.id,
          label: x.firstName + " " + x.lastName,
        })) || []
      }
    />
  );
};
