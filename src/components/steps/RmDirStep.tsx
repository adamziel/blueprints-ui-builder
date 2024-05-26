import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const RmDirStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["rmDir"].label} />

      <TextField
        label="Path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].path`)}
      />
    </>
  );
}

export default RmDirStep;