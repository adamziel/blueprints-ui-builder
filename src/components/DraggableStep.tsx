import React, { useRef } from "react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { DragItemTypes } from "../types";

import Step from "./Step";
import { boxImage } from "./boximage";
import { DraggedItem } from "./StepsList";
import { setPlaceholderIndex, StepModel } from "../context/steps";
import { useDispatch } from "react-redux";

interface DraggableStepProps {
  index: number;
  step: StepModel;
}

const DraggableStep: React.FC<DraggableStepProps> = (props) => {
  const { index, step } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragItemTypes.STEP,
    item: { type: DragItemTypes.STEP, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    hover(item: DraggedItem, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.index === props.index) {
        dispatch(setPlaceholderIndex(null));
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      const targetIndex = hoverClientY < hoverMiddleY ? index : index + 1;

      if (item.index === props.index - 1 && targetIndex === props.index) {
        dispatch(setPlaceholderIndex(null));
        return;
      }

      dispatch(setPlaceholderIndex(targetIndex));
    },
  });

  drag(drop(ref));

  return (
    <div className="draggable-step">
      <DragPreviewImage
        key={new Date().getTime()}
        connect={preview}
        src={boxImage}
      />
      <div
        className="step-drag-wrapper"
        ref={ref}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
      >
        <Step stepIndex={index} isDragging={isDragging} />
      </div>
    </div>
  );
};

export default DraggableStep;
