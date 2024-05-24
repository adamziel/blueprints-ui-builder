import React from "react";
import { StepProps } from "../../types";
import { updateStepAttribute } from "../../context/steps";
import { ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../context/store";
import WordPressThemeAutocomplete from "../forms/WordPressThemeAutocomplete";

const InstallThemeStep: React.FC<StepProps> = ({ stepIndex: index }) => {
  const step = useSelector((state: RootState) => state.steps.steps[index]);
  const dispatch = useDispatch();
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install theme"} />

      <WordPressThemeAutocomplete
        stepIndex={index}
        stepAttribute="themeZipFile"
        sx={{ flexGrow: 1 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={step.activate}
            onChange={(e) =>
              dispatch(
                updateStepAttribute({
                  index,
                  key: "activate",
                  value: e.target.checked,
                }),
              )
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Activate?"
      />
    </>
  );
};

export default InstallThemeStep;
