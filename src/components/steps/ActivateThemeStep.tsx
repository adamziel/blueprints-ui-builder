import React from "react";
import { StepProps } from "../../types";
import { updateStepAttribute } from "../../context/steps";
import { ListItemText, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../context/store";

const ActivateThemeStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  const step = useSelector((state: RootState) => state.steps.steps[index]);
  const dispatch = useDispatch();
  return (
    <>
      <ListItemText primary="Activate theme" />

      <TextField
        label="Theme name"
        variant="outlined"
        value={step.themePath}
        onChange={(e) =>
          dispatch(
            updateStepAttribute({
              index,
              key: "themeName",
              value: e.target.value,
            }),
          )
        }
        sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
        fullWidth
      />
    </>
  );
};

export default ActivateThemeStep;
