import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import PhpValueField from "../forms/PhpValueField";

const DefinePHPConstantStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["defineWpConfigConstants"].label} />

      <TextField
        label="Name"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].name`, { required: true })}
      />

      <PhpValueField 
        name={`steps[${index}].value`}
        selectLabel="Constant data type"
        textFieldLabel="Constant value"
      />
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
    </>
  );
};

export default DefinePHPConstantStep;
