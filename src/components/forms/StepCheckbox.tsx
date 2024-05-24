import React from "react";
import { updateStepAttribute } from "../../context/steps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";

const StepCheckbox: React.FC<any> = ({ name, index, ...rest }) => {
  const steps = useSelector((state: RootState) => state.steps.steps);
  const dispatch = useDispatch();
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateStepAttribute({ index, key: name, value: e.target.checked }),
    );
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
