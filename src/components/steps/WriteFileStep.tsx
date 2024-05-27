import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const WriteFileStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary={StepsMeta["writeFile"].label} />

      <TextField
        label="Path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].path`, { required: true })}
      />
      
      <TextField
        label="Contents"
        variant="outlined"
        multiline
        rows={4}
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].data`, { required: true })}
      />
    </>
  );
};

export default WriteFileStep;
