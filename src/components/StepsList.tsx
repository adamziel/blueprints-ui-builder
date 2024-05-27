import React, { Fragment, useRef, useState } from "react";
import DraggableStep from "./step-helpers/DraggableStep";
import { useDrop } from "react-dnd";
import { List } from "@mui/material";
import { createStep, StepSlug } from "../model";
import Step from "./step-helpers/Step";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

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

const StepsList: React.FC = () => {
  const { control, getValues, formState } = useFormContext();
  const { fields, remove, swap, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "steps", // unique name for your Field Array
  });
  console.log(getValues());
  const ref = useRef<HTMLDivElement>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const steps = getValues().steps || [];

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    drop(item: DraggedItem) {
      setDropIndex(null);
      if (!ref.current || dropIndex === null) {
        return;
      }
      console.log({ dropIndex, item });
      if (item.type === DragItemTypes.STEP) {
        swap(item.index!, dropIndex);
      } else if (item.stepSlug) {
        insert(dropIndex, createStep(item.stepSlug));
      }
    },
  });

  drop(ref);

  return (
    <List sx={{ position: "relative", width: '100%' }}>
      {fields.map((field: any, index) => (
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
    </List>
  );
};

export default StepsList;
