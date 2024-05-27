import React from "react";
import { ListItemText, TextField } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import Resource from "../forms/Resource";

const RunSQLStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText primary={StepsMeta["runSql"].label} />

      <Resource selectLabel="SQL queries" name={`steps[${index}].sql`} />
    </>
  );
};

export default RunSQLStep;
