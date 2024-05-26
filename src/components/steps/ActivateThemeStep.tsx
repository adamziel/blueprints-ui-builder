import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../step-helpers/Step";

const ActivateThemeStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary="Activate theme" />

      <TextField
        label="Theme name"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...useFormikFieldProps(`steps[${index}].themeName`)}
      />
    </>
  );
};

export default ActivateThemeStep;
