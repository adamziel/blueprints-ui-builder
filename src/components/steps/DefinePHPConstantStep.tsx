import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import PhpValueField from "../forms/PhpValueField";

const DefinePHPConstantStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["defineWpConfigConstants"].label} />

      <TextField
        label="Name"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...useFormikFieldProps(`steps[${index}].name`)}
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
