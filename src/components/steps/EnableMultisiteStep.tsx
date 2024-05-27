import React from "react";
import { ListItemText } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";

const EnableMultisiteStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["enableMultisite"].label} />
    </>
  );
};

export default EnableMultisiteStep;
