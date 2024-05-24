import React from "react";
import { StepProps } from "../../types";
import StepInputText from "../forms/StepInputText";

const ActivatePluginStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  return (
    <div className="step">
      <h4>Define a PHP constant</h4>
      <label>
        Name
        <StepInputText name="name" index={index} />
      </label>
      <label>
        Value
        <StepInputText name="value" index={index} />
      </label>
    </div>
  );
};

export default ActivatePluginStep;
