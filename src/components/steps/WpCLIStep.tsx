import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

const WpCLIStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["wp-cli"].label} />

      <TextField
        label="Command"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].command`, { required: true })}
      />
    </>
  );
}

export default WpCLIStep;