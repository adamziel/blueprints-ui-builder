import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const MvStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["mv"].label} />

      <TextField
        label="From path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].fromPath`, { required: true })}
      />

      <TextField
        label="To path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].toPath`, { required: true })}
      />
    </>
  );
};

export default MvStep;
