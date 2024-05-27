import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const ActivatePluginStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary="Activate plugin" />

      <TextField
        label="Path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...register(`steps[${index}].path`, { required: true })}
      />
    </>
  );
};

export default ActivatePluginStep;
