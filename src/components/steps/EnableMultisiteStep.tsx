import React from "react";
import { ListItemText } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";

const EnableMultisiteStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["enableMultisite"].label} />
    </>
  );
};

export default EnableMultisiteStep;
