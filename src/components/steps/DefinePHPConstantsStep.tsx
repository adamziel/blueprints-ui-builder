import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";

const DefinePHPConstantStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["defineWpConfigConstants"].label} />

      <TextField
        label="Name"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].name`)}
      />

      <TextField
        label="Value"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].value`)}
      />
    </>
  );
};

export default DefinePHPConstantStep;
