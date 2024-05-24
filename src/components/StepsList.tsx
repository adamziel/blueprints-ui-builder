import React, { useRef } from "react";
import DraggableStep from "./DraggableStep";
import Sidebar from "./Sidebar";
import { StepsMeta, useAppState, StepSlug } from "../context/StepsContext";
import { useDrop } from "react-dnd";
import { DragItemTypes } from "../types";
import { useDispatch } from "../context/actions";

export type DraggedItem = { type: string; index?: number; stepSlug?: StepSlug };

const DragPlaceholder: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="drag-placeholder"
    style={{
      opacity: visible ? 1 : 0,
    }}
  />
);

const StepsList: React.FC = () => {
  const { steps, placeholderIndex } = useAppState();
  const { setPlaceholderIndex, swapSteps, insertStep } = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    drop(item: DraggedItem, monitor) {
      setPlaceholderIndex(null);
      if (!ref.current || placeholderIndex === null) {
        return;
      }
      if (item.type === DragItemTypes.STEP) {
        swapSteps(item.index!, placeholderIndex);
      } else if (item.stepSlug) {
        insertStep(placeholderIndex, {
          step: item.stepSlug,
          ...(StepsMeta[item.stepSlug]?.defaultValues || {}),
        });
      }
    },
  });

  drop(ref);

  return (
    <div className="steps-container">
      <pre style={{ textAlign: "left" }}>{JSON.stringify(steps, null, 4)}</pre>
      <Sidebar availableSteps={Object.values(StepsMeta)} />
      <div className="steps-list" ref={ref}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <DragPlaceholder
              visible={placeholderIndex === index}
              key={"placeholder" + index}
            />
            <DraggableStep key={"step" + index} index={index} step={step} />
          </React.Fragment>
        ))}
        <DragPlaceholder
          visible={placeholderIndex === steps.length}
          key={steps.length}
        />
      </div>
    </div>
  );
};

export default StepsList;
