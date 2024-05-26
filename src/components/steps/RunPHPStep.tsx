import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const RunPHPStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["runPHP"].label} />

      <TextField
        label="Code"
        variant="outlined"
        multiline
        rows={4}
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].code`)}
      />
    </>
  );
};

export default RunPHPStep;
