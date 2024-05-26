// import ActivatePluginStep from "./steps/ActivatePluginStep";
// import CpStep from "./steps/CpStep";
// import DefinePHPConstantsStep from "./steps/DefinePHPConstantsStep";
// import InstallPluginStep from "./steps/InstallPluginStep";
import MvStep from "../steps/MvStep";
import { Delete } from "@mui/icons-material";
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
// import InstallThemeStep from "./steps/InstallThemeStep";
// import ActivateThemeStep from "./steps/ActivateThemeStep";
import { useFormikContext } from "formik";
import { BlueprintFormState } from "../MainForm";
import CpStep from "../steps/CpStep";
import InstallThemeStep from "../steps/InstallThemeStep";
import InstallPluginStep from "../steps/InstallPluginStep";
import ActivatePluginStep from "../steps/ActivatePluginStep";
import ActivateThemeStep from "../steps/ActivateThemeStep";
import DefinePHPConstantsStep from "../steps/DefinePHPConstantsStep";

export interface StepProps {
  index: number;
  remove: () => void;
}

const Step: React.FC<StepProps> = (props) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<BlueprintFormState>();
  const step = values.steps[props.index];

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
        return null;
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
        <IconButton edge="end" color="secondary" onClick={() => props.remove()}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Step;
