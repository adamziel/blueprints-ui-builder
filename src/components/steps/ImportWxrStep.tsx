import React from "react";
import { ListItemText } from "@mui/material";
import { StepProps } from "../step-helpers/Step";
import { StepsMeta } from "../../model";
import Resource from "../forms/Resource";

const ImportWxrStep: React.FC<StepProps> = ({ index }) => {
  return (
    <>
      <ListItemText sx={{flexGrow:0}} primary={StepsMeta["importWxr"].label} />

      <Resource
        name={`steps[${index}].file`}
        selectLabel="WXR file Source"
        disableRawData
      />    
    </>
  );
};

export default ImportWxrStep;
