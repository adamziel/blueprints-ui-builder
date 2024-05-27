import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const ActivateThemeStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary="Activate theme" />

      <TextField
        label="Theme name"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
        {...register(`steps[${index}].themeName`, { required: true })}
      />
    </>
  );
};

export default ActivateThemeStep;
