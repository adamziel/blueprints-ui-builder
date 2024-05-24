import React, { useRef } from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { DragItemTypes, StepData } from '../types';

import Step from './Step';
import { boxImage } from './boximage';
import { DraggedItem } from './StepsList';
import { useDispatch } from '../context/actions';

interface DraggableStepProps {
  index: number;
  step: StepData;
}

const DraggableStep: React.FC<DraggableStepProps> = (props) => {
    const { index, step } = props;
    const ref = useRef<HTMLDivElement>(null);
    const { setPlaceholderIndex } = useDispatch()
    
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
          setPlaceholderIndex(null);
          return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
        const targetIndex = hoverClientY < hoverMiddleY ? index : index + 1;

        if (item.index === props.index - 1 && targetIndex === props.index) {
            setPlaceholderIndex(null);
            return;
        }
        
      setPlaceholderIndex(targetIndex);
    },
    
  });
    
  drag(drop(ref));

  return (
    <div className="draggable-step">
        <DragPreviewImage key={new Date().getTime()} connect={preview} src={boxImage} />
          <div className="step-drag-wrapper" ref={ref} style={{
            opacity: isDragging ? 0 : 1
        }}>
            <Step step={step} index={index} isDragging={isDragging} />
        </div>
    </div>
);
}

export default DraggableStep;
