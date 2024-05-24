import { ConnectDragPreview } from "react-dnd";

export interface StepProps {
    index: number;
    step: StepData;
    isDragging: boolean;
  }
  

export interface StepData {
  key: string;
  [key: string]: any;
}

export const DragItemTypes = {
  STEP: 'step',
  CARD: 'card',
};