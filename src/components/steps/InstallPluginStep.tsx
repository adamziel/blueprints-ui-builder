import React from "react";
import {
  ListItemText,
  Checkbox,
  FormControlLabel,
  StepProps,
} from "@mui/material";
import WordPressPluginAutocompleteField from "../forms/WordPressPluginAutocompleteField";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const InstallPluginStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install plugin"} />

      <WordPressPluginAutocompleteField
        sx={{ flexGrow: 1 }}
        {...useFormikFieldProps(`steps[${index}].pluginZipFile`)}
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

export default InstallPluginStep;
