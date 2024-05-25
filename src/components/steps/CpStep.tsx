import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../Step";
import { StepsMeta } from "../../model/steps";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const CpStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["cp"].label} />

      <TextField
        label="From path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].fromPath`)}
      />

      <TextField
        label="To path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].toPath`)}
      />
    </>
  );
};

export default CpStep;
