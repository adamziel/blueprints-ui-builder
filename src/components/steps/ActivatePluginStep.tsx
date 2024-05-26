import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../step-helpers/Step";

const ActivatePluginStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary="Activate plugin" />

      <TextField
        label="Path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...useFormikFieldProps(`steps[${index}].path`)}
      />
    </>
  );
};

export default ActivatePluginStep;
