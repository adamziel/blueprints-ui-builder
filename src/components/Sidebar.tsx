import React from "react";
import { useDrag } from "react-dnd";
import { StepMeta } from "../context/steps";
import { Box } from "@mui/material";

const ItemTypes = {
  CARD: "card",
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
    <Box
      ref={drag}
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: 1.5, // MUI's spacing system (10px is equivalent to 2 * 8px)
        marginBottom: 1,
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        borderRadius: 2
      }}
    >
      {stepMeta.label}
    </Box>
  );
};

export default Sidebar;
