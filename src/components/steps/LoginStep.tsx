import React from "react";
import { ListItemText } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model/steps";

const LoginStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText primary={StepsMeta["login"].label} />
    </>
  );
};

export default LoginStep;
