import React from "react";
import { StepProps } from "../../types";
import { StepsMeta, updateStepAttribute } from "../../context/steps";
import { ListItemText, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../context/store";

const DefinePHPConstantStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  const step = useSelector((state: RootState) => state.steps.steps[index]);
  const dispatch = useDispatch();
  return (
    <>
      <ListItemText primary={StepsMeta["defineWpConfigConstants"].label} />

      <TextField
        label="Name"
        variant="outlined"
        value={step.name}
        onChange={(e) =>
          dispatch(
            updateStepAttribute({
              index,
              key: "name",
              value: e.target.value,
            }),
          )
        }
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      />

      <TextField
        label="Value"
        variant="outlined"
        value={step.value}
        onChange={(e) =>
          dispatch(
            updateStepAttribute({
              index,
              key: "value",
              value: e.target.value,
            }),
          )
        }
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      />
    </>
  );
};

export default DefinePHPConstantStep;
