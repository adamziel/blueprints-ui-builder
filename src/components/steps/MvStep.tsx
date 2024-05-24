import React from "react";
import { StepProps } from "../../types";
import StepInputText from "../forms/StepInputText";
import { StepsMeta } from "../../context/StepsContext";

const ActivatePluginStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  return (
    <div className="step">
      <h4>{StepsMeta["mv"].label}</h4>
      <label>
        From Path
        <StepInputText name="fromPath" index={index} />
      </label>
      <label>
        To Path
        <StepInputText name="toPath" index={index} />
      </label>
    </div>
  );
};

export default ActivatePluginStep;
