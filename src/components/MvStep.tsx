import React from 'react';
import { StepProps } from '../types';
import StepCheckbox from './forms/StepCheckbox';
import StepInputText from './forms/StepInputText';

const ActivatePluginStep: React.FC<StepProps> = ({
  step,
  index,
}) => {
  return (
    <div className="step">
      <h4>Move files or directories</h4>
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
