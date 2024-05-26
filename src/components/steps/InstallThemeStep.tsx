import React from "react";
import { ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../step-helpers/Step";
import WordPressThemeAutocompleteField from "../forms/WordPressThemeAutocompleteField";

const InstallThemeStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install theme"} />

      <WordPressThemeAutocompleteField
        sx={{ flexGrow: 1 }}
        {...useFormikFieldProps(`steps[${index}].themeZipFile`)}
      />

      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            {...useFormikFieldProps(`steps[${index}].activate`)}
          />
        }
        label="Activate?"
      />
    </>
  );
};

export default InstallThemeStep;
