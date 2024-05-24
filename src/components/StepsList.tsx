import React, { useRef } from "react";
import DraggableStep from "./DraggableStep";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { DragItemTypes } from "../types";
import { AppDispatch, RootState } from "../context/store";
import {
  insertStep,
  setPlaceholderIndex,
  StepSlug,
  StepsMeta,
  swapSteps,
} from "../context/steps";

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
  const { steps, placeholderIndex } = useSelector(
    (state: RootState) => state.steps,
  );
  const dispatch = useDispatch<AppDispatch>();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    drop(item: DraggedItem) {
      dispatch(setPlaceholderIndex(null));
      if (!ref.current || placeholderIndex === null) {
        return;
      }
      if (item.type === DragItemTypes.STEP) {
        dispatch(
          swapSteps({ dragIndex: item.index!, hoverIndex: placeholderIndex }),
        );
      } else if (item.stepSlug) {
        dispatch(
          insertStep({
            index: placeholderIndex,
            step: {
              step: item.stepSlug,
              ...(StepsMeta[item.stepSlug]?.defaultValues || {}),
            },
          }),
        );
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
