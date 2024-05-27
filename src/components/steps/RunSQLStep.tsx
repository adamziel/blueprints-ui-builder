import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const RunSQLStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary={StepsMeta["runSql"].label} />

      <TextField
        label="Code"
        variant="outlined"
        multiline
        rows={4}
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].sql`, { required: true })}
      />
    </>
  );
};

export default RunSQLStep;
