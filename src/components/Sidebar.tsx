import React from 'react';
import { useDrag } from 'react-dnd';
import { StepMeta } from '../context/StepsContext';

const ItemTypes = {
  CARD: 'card',
};

interface SidebarProps {
  availableSteps: StepMeta[];
}

const Sidebar: React.FC<SidebarProps> = ({ availableSteps }) => {
  return (
    <div className="sidebar">
      <h3>Available Steps</h3>
      {availableSteps.map((stepMeta, index) => (
        <StepCard key={index} stepMeta={stepMeta} />
      ))}
    </div>
  );
};

interface StepCardProps {
    stepMeta: StepMeta;
}

const StepCard: React.FC<StepCardProps> = ({ stepMeta }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, stepSlug: stepMeta.slug },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="step-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {stepMeta.label}
    </div>
  );
};

export default Sidebar;
