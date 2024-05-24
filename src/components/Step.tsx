import { useDispatch, useSelector } from "react-redux";
import { StepProps } from "../types";
import ActivatePluginStep from "./steps/ActivatePluginStep";
import CpStep from "./steps/CpStep";
import DefinePHPConstantsStep from "./steps/DefinePHPConstantsStep";
import InstallPluginStep from "./steps/InstallPluginStep";
import MvStep from "./steps/MvStep";
import { AppDispatch, RootState } from "../context/store";
import { removeStep } from "../context/steps";
import { Delete } from "@mui/icons-material";
import { ListItem, ListItemSecondaryAction, IconButton, Box } from "@mui/material";
import InstallThemeStep from "./steps/InstallThemeStep";
import ActivateThemeStep from "./steps/ActivateThemeStep";

const Step: React.FC<StepProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const step = useSelector(
    (state: RootState) => state.steps.steps[props.stepIndex],
  );
  const renderStep = function () {
    switch (step.step) {
      case "installTheme":
        return <InstallThemeStep {...props} />;
      case "installPlugin":
        return <InstallPluginStep {...props} />;
      case "activatePlugin":
        return <ActivatePluginStep {...props} />;
      case "activateTheme":
        return <ActivateThemeStep {...props} />;
      case "mv":
        return <MvStep {...props} />;
      case "cp":
        return <CpStep {...props} />;
      case "defineWpConfigConstants":
        return <DefinePHPConstantsStep {...props} />;
      default:
        throw new Error("No such step " + step.step);
    }
  };
  return (
    <ListItem divider>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{ flexGrow: 1, gap: 2, margin: 0 }}
        alignItems="center"
        mb={2}
      >
        {renderStep()}
      </Box>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          color="secondary"
          onClick={() => dispatch(removeStep(props.stepIndex))}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Step;
