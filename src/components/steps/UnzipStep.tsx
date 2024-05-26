import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const UnzipStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["unzip"].label} />

      <TextField
        label="ZIP path in VFS"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].zipFile`)}
      />
      <TextField
        label="Extract to path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].extractToPath`)}
      />
    </>
  );
}

export default UnzipStep;