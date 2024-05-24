import { useDispatch } from "../context/actions";
import { useAppState } from "../context/StepsContext";
import { StepProps } from "../types";
import ActivatePluginStep from "./steps/ActivatePluginStep";
import CpStep from "./steps/CpStep";
import DefinePHPConstantsStep from "./steps/DefinePHPConstantsStep";
import InstallPluginStep from "./steps/InstallPluginStep";
import MvStep from "./steps/MvStep";

const Step: React.FC<StepProps> = (props) => {
  const { removeStep } = useDispatch();
  const step = useAppState().steps[props.stepIndex];
  const renderStep = function () {
    switch (step.step) {
      case "installPlugin":
        return <InstallPluginStep {...props} />;
      case "activatePlugin":
        return <ActivatePluginStep {...props} />;
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
    <div className="step-wrapper">
      {renderStep()}
      <button
        className="step-delete"
        onClick={() => removeStep(props.stepIndex)}
      >
        {" "}
        X{" "}
      </button>
    </div>
  );
};

export default Step;
