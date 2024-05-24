import React, { Fragment, useEffect, useRef } from "react";
import DraggableStep from "./DraggableStep";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { DragItemTypes } from "../types";
import { AppDispatch, RootState } from "../context/store";
import {
  insertStep,
  setDropIndex,
  StepSlug,
  StepsMeta,
  swapSteps,
} from "../context/steps";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";

export type DraggedItem = { type: string; index?: number; stepSlug?: StepSlug };

const DropPositionIndicator: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="drop-position-indicator"
    style={{
      opacity: visible ? 1 : 0,
    }}
  />
);

const StepsList: React.FC = () => {
  const { steps, dropIndex } = useSelector((state: RootState) => state.steps);
  const dispatch = useDispatch<AppDispatch>();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [DragItemTypes.STEP, DragItemTypes.CARD],
    drop(item: DraggedItem) {
      dispatch(setDropIndex(null));
      if (!ref.current || dropIndex === null) {
        return;
      }
      if (item.type === DragItemTypes.STEP) {
        dispatch(swapSteps({ dragIndex: item.index!, hoverIndex: dropIndex }));
      } else if (item.stepSlug) {
        dispatch(
          insertStep({
            index: dropIndex,
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
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ flexGrow: 1, gap: 2, margin: 0, flexWrap: "wrap" }}
    >
      <pre style={{ textAlign: "left", flexBasis: "100%" }}>
        {JSON.stringify(steps, null, 4)}
      </pre>
      <Sidebar availableSteps={Object.values(StepsMeta)} />
      <div ref={ref}>
        <List>
          {steps.map((step, index) => (
            <Fragment key={"step-" + index}>
              <DropPositionIndicator
                visible={dropIndex === index}
                key={"placeholder" + index}
              />
              <DraggableStep index={index} step={step} key={"step-" + index} />
            </Fragment>
          ))}
          <DropPositionIndicator
            visible={dropIndex === steps.length}
            key={steps.length}
          />
        </List>
      </div>
    </Box>
  );
};

export default StepsList;
