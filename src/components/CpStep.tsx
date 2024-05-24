import React from 'react';
import { StepProps } from '../types';
import StepInputText from './forms/StepInputText';
import StepCheckbox from './forms/StepCheckbox';

const ActivatePluginStep: React.FC<StepProps> = ({
  step,
  index,
}) => {
  return (
    <div className="step">
      <h4>Copy files or directories</h4>
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
