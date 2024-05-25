import React, { Fragment, useRef, useState } from "react";
import DraggableStep from "./DraggableStep";
import { useDrop } from "react-dnd";
import { List } from "@mui/material";
import { FieldArray, FieldArrayRenderProps, useFormikContext } from "formik";
import { StepSlug, StepsMeta } from "../model/steps";
import { BlueprintFormState } from "./MainForm";
import Step from "./Step";

export type DraggedItem = { type: string; index?: number; stepSlug?: StepSlug };

const DropPositionIndicator: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="drop-position-indicator"
    style={{
      opacity: visible ? 1 : 0,
    }}
  />
);

export const DragItemTypes = {
  STEP: "step",
  CARD: "card",
};

const StepsListStructure: React.FC = () => {
  return (
    <List>
      <FieldArray name="steps">
        {(props) => <StepsList {...props} />}
      </FieldArray>
    </List>
  );
};

interface StepListProps extends FieldArrayRenderProps {}
const StepsList: React.FC<StepListProps> = ({
  push,
  remove,
  handleSwap,
  handlePush,
}) => {
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<BlueprintFormState>();
  const steps = values.steps;

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    drop(item: DraggedItem) {
      setDropIndex(null);
      if (!ref.current || dropIndex === null) {
        return;
      }
      if (item.type === DragItemTypes.STEP) {
        handleSwap(item.index!, dropIndex);
      } else if (item.stepSlug) {
        handlePush({
          index: dropIndex,
          step: {
            step: item.stepSlug,
            ...(StepsMeta[item.stepSlug]?.defaultValues || {}),
          },
        });
      }
    },
  });

  drop(ref);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      {steps.map((step, index) => (
        <Fragment key={"step-" + index}>
          <DropPositionIndicator
            visible={dropIndex === index}
            key={"placeholder" + index}
          />
          <DraggableStep
            index={index}
            key={"step-" + index}
            setDropIndex={setDropIndex}
          >
            <Step
              index={index}
              remove={() => {
                remove(index);
              }}
            />
          </DraggableStep>
        </Fragment>
      ))}
      <DropPositionIndicator
        visible={dropIndex === steps.length}
        key={steps.length}
      />
    </div>
  );
};

export default StepsListStructure;
