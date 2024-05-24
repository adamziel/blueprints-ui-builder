import React from 'react';
import { useDrag } from 'react-dnd';
import { StepDefinition } from '../context/StepsContext';

const ItemTypes = {
  CARD: 'card',
};

interface SidebarProps {
  availableSteps: StepDefinition[];
}

const Sidebar: React.FC<SidebarProps> = ({ availableSteps }) => {
  return (
    <div className="sidebar">
      <h3>Available Steps</h3>
      {availableSteps.map((step, index) => (
        <StepCard key={index} step={step} />
      ))}
    </div>
  );
};

interface StepCardProps {
    step: StepDefinition;
}

const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, stepSlug: step.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="step-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {step.name}
    </div>
  );
};

export default Sidebar;
