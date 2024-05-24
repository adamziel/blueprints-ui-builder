import React from "react";
import { StepProps } from "../../types";
import StepInputText from "../forms/StepInputText";
import StepCheckbox from "../forms/StepCheckbox";
import { StepsMeta } from "../../context/StepsContext";

const ActivatePluginStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  return (
    <div className="step">
      <h4>{StepsMeta["installPlugin"].label}</h4>
      <label>
        Path
        <StepInputText name="pluginZipFile" index={index} />
      </label>
      <label>
        Activate?
        <StepCheckbox name="activate" index={index} />
      </label>
    </div>
  );
};

export default ActivatePluginStep;
