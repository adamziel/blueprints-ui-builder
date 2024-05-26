import React, { useRef } from "react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";

import { boxImage } from "../boximage";
import { DraggedItem, DragItemTypes } from "../StepsList";

interface DraggableStepProps {
  index: number;
  setDropIndex: (index: number | null) => void;
  children: React.ReactNode;
}

const DraggableStep: React.FC<DraggableStepProps> = (props) => {
  const { index, setDropIndex, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);

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
        setDropIndex(null);
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      const targetIndex = hoverClientY < hoverMiddleY ? index : index + 1;

      if (item.index === props.index - 1 && targetIndex === props.index) {
        setDropIndex(null);
        return;
      }

      setDropIndex(targetIndex);
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
        {props.children}
      </div>
    </div>
  );
};

export default DraggableStep;
