import React from "react";
import { useDispatch } from "../../context/actions";
import { useAppState } from "../../context/StepsContext";

const StepCheckbox: React.FC<any> = ({ name, index, ...rest }) => {
  const { steps } = useAppState();
  const actions = useDispatch();
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateStepAttribute(index, name, e.target.checked);
  };

  const step = steps[index];
  return (
    <input
      name={name}
      type="checkbox"
      value={step[name] || ""}
      checked={step[name] || false}
      onChange={handleCheckboxChange}
      {...rest}
    />
  );
};

export default StepCheckbox;
