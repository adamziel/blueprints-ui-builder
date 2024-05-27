import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const ImportWxrStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary={StepsMeta["importWxr"].label} />
      <TextField
        label="Url"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...register(`steps[${index}].url`, { required: true })}
      />
    </>
  );
};

export default ImportWxrStep;
