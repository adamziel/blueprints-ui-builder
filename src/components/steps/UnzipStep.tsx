import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import Resource from "../forms/Resource";

const UnzipStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["unzip"].label} />

      <Resource
        selectLabel="ZIP file source"
        name={`steps[${index}].zipFile`}
        disableRawData
      />

      <TextField
        label="Extract to path"
        variant="outlined"
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        {...register(`steps[${index}].extractToPath`, { required: true })}
      />
    </>
  );
};

export default UnzipStep;
