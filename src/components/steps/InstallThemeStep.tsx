import React from "react";
import { ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../Step";
import WordPressThemeAutocomplete from "../forms/WordPressThemeAutocomplete";

const InstallThemeStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install theme"} />

      <WordPressThemeAutocomplete
        stepIndex={index}
        stepAttribute="themeZipFile"
        sx={{ flexGrow: 1 }}
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
