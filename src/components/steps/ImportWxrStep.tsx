import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

const ImportWxrStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["importWxr"].label} />
      <TextField
        label="Url"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...useFormikFieldProps(`steps[${index}].url`)}
      />
    </>
  );
};

export default ImportWxrStep;
