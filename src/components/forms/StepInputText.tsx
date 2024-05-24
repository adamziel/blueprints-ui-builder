import React from "react";
import { useDispatch } from "../../context/actions";
import { useAppState } from "../../context/StepsContext";

const StepInputText: React.FC<any> = ({ name, index, ...rest }) => {
  const { steps } = useAppState();
  const actions = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateStepAttribute(index, e.target.name, e.target.value);
  };

  const step = steps[index];
  return (
    <input
      name={name}
      type="text"
      value={step[name] || ""}
      onChange={handleInputChange}
      {...rest}
    />
  );
};

export default StepInputText;
