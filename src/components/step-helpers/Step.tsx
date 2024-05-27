import MvStep from "../steps/MvStep";
import { Delete } from "@mui/icons-material";
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import { BlueprintFormState } from "../MainForm";
import CpStep from "../steps/CpStep";
import InstallThemeStep from "../steps/InstallThemeStep";
import InstallPluginStep from "../steps/InstallPluginStep";
import ActivatePluginStep from "../steps/ActivatePluginStep";
import ActivateThemeStep from "../steps/ActivateThemeStep";
import DefinePHPConstantsStep from "../steps/DefinePHPConstantStep";
import EnableMultisiteStep from "../steps/EnableMultisiteStep";
import ImportWxrStep from "../steps/ImportWxrStep";
import LoginStep from "../steps/LoginStep";
import MkDirStep from "../steps/MkDirStep";
import RmDirStep from "../steps/RmDirStep";
import RunPHPStep from "../steps/RunPHPStep";
import RunSQLStep from "../steps/RunSQLStep";
import SetSiteOptionStep from "../steps/SetSiteOptionStep";
import UnzipStep from "../steps/UnzipStep";
import WpCLIStep from "../steps/WpCLIStep";
import WriteFileStep from "../steps/WriteFileStep";
import RmStep from "../steps/RmStep";
import { useFormContext } from "react-hook-form";

export interface StepProps {
  index: number;
  remove: () => void;
}

const stepComponents = {
  activatePlugin: ActivatePluginStep,
  activateTheme: ActivateThemeStep,
  cp: CpStep,
  defineWpConfigConstants: DefinePHPConstantsStep,
  enableMultisite: EnableMultisiteStep,
  importWxr: ImportWxrStep,
  installPlugin: InstallPluginStep,
  installTheme: InstallThemeStep,
  login: LoginStep,
  mkDir: MkDirStep,
  mv: MvStep,
  rm: RmStep,
  rmDir: RmDirStep,
  runPHP: RunPHPStep,
  runSql: RunSQLStep,
  setSiteOptions: SetSiteOptionStep,
  unzip: UnzipStep,
  ["wp-cli"]: WpCLIStep,
  writeFile: WriteFileStep,
} as any;

const Step: React.FC<StepProps> = (props) => {
  const { getValues } = useFormContext<BlueprintFormState>();
  const step = getValues().steps[props.index] as any;

  const StepComponent = stepComponents[step.step];
  return (
    <ListItem divider>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{ flexGrow: 1, gap: 2, margin: 0 }}
        alignItems="center"
        mb={2}
      >
        {StepComponent ? <StepComponent index={props.index} /> : null}
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
