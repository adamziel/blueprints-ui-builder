import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import Resource from "../forms/Resource";

const WriteFileStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["writeFile"].label} />

      <TextField
        label="Path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].path`, { required: true })}
      />
      
      <Resource name={`steps[${index}].data`} />
    </>
  );
};

export default WriteFileStep;
