import React from "react";
import { StepProps } from "../../types";
import { StepsMeta, updateStepAttribute } from "../../context/steps";
import { ListItemText, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../context/store";

const CpStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  const step = useSelector((state: RootState) => state.steps.steps[index]);
  const dispatch = useDispatch();
  return (
    <>
      <ListItemText primary={StepsMeta["cp"].label} />

      <TextField
        label="From path"
        variant="outlined"
        value={step.fromPath}
        onChange={(e) =>
          dispatch(
            updateStepAttribute({
              index,
              key: "fromPath",
              value: e.target.value,
            }),
          )
        }
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      />

      <TextField
        label="To path"
        variant="outlined"
        value={step.toPath}
        onChange={(e) =>
          dispatch(
            updateStepAttribute({
              index,
              key: "toPath",
              value: e.target.value,
            }),
          )
        }
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      />
    </>
  );
};

export default CpStep;
