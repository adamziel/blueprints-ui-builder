import React from "react";
import { StepProps } from "../../types";
import StepInputText from "../forms/StepInputText";
import { StepsMeta } from "../../context/steps";

const ActivatePluginStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  return (
    <div className="step">
      <h4>{StepsMeta["cp"].label}</h4>
      <label>
        <span className="label-text">From Path</span>
        <StepInputText name="fromPath" index={index} />
      </label>
      <label>
        <span className="label-text">To Path</span>
        <StepInputText name="toPath" index={index} />
      </label>
    </div>
  );
};

export default ActivatePluginStep;
