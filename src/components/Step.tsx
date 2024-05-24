import { useDispatch } from "../context/actions";
import { useAppState } from "../context/StepsContext";
import { StepProps } from "../types";
import ActivatePluginStep from "./ActivatePluginStep";
import CpStep from "./CpStep";
import DefinePHPConstantsStep from "./DefinePHPConstantsStep";
import InstallPluginStep from "./InstallPluginStep";
import MvStep from "./MvStep";

const Step: React.FC<StepProps> = (props) => {
    const { removeStep } = useDispatch();
    const step = useAppState().steps[props.stepIndex];
    const renderStep = function () {
        switch (step.step) {
            case 'installPlugin':
                return <InstallPluginStep {...props} />;
            case 'activatePlugin':
                return <ActivatePluginStep {...props} />;
            case 'mv':
                return <MvStep {...props} />;
            case 'cp':
                return <CpStep {...props} />;
            case 'defineWpConfigConstants':
                return <DefinePHPConstantsStep {...props} />;
            default:
                throw new Error('No such step ' + step.step)
        }
    }
    return (
        <div className="step-wrapper">
            <button onClick={() => removeStep(props.stepIndex)}>-</button>
            {renderStep()}
        </div>
    )
}

export default Step;
