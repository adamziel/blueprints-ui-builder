import React, { createContext, useContext, useReducer } from "react";
import {
  SET_PLACEHOLDER_INDEX,
  UPDATE_STEP_ATTRIBUTE,
  ADD_STEP,
  INSERT_STEP,
  MOVE_STEP,
  REMOVE_STEP,
  TOGGLE_CHECKBOX,
} from "./actions";

export interface StepModel {
  step: string;
  [key: string]: any;
}

interface ApplicationState {
  steps: StepModel[];
  placeholderIndex: number | null;
}

interface StepsContextProps {
  state: ApplicationState;
  dispatch: React.Dispatch<any>;
}

export interface StepMeta {
  slug: string;
  label: string;
  defaultValues?: Record<string, any>;
}
export const StepsMeta: Record<string, StepMeta> = {
  installPlugin: {
    slug: "installPlugin",
    label: "Install Plugin",
    defaultValues: {
      activate: true,
    },
  },
  activatePlugin: {
    slug: "activatePlugin",
    label: "Activate Plugin",
  },
  mv: {
    slug: "mv",
    label: "Move a file or directory",
  },
  cp: {
    slug: "cp",
    label: "Copy a file or directory",
  },
  defineWpConfigConstants: {
    slug: "defineWpConfigConstants",
    label: "Define a PHP constant",
  },
} as const;

export type StepSlug = keyof StepMeta;

export function createStep(slug: string): StepModel {
  return {
    step: slug,
    ...(StepsMeta[slug]?.defaultValues || {}),
  };
}

const initialSteps: StepModel[] = [
  createStep("installPlugin"),
  createStep("activatePlugin"),
  createStep("mv"),
  createStep("cp"),
  createStep("defineWpConfigConstants"),
];

const initialState: ApplicationState = {
  steps: initialSteps,
  placeholderIndex: null,
};

export const StepsContext = createContext<StepsContextProps | undefined>(
  undefined,
);

const stepsReducer = (
  state: ApplicationState,
  action: any,
): ApplicationState => {
  switch (action.type) {
    case SET_PLACEHOLDER_INDEX:
      return { ...state, placeholderIndex: action.payload };
    case ADD_STEP:
      return { ...state, steps: [...state.steps, action.payload] };
    case INSERT_STEP:
      return {
        ...state,
        steps: [
          ...state.steps.slice(0, action.payload.index),
          action.payload.step,
          ...state.steps.slice(action.payload.index),
        ],
        placeholderIndex: null,
      };
    case REMOVE_STEP:
      return {
        ...state,
        steps: state.steps.filter((_, i) => i !== action.payload),
      };
    case MOVE_STEP:
      let { dragIndex, hoverIndex } = action.payload;
      const dragStep = state.steps[dragIndex];
      const updatedSteps = state.steps.filter((_, i) => i !== dragIndex);
      if (dragIndex < hoverIndex) {
        --hoverIndex;
      }
      updatedSteps.splice(hoverIndex, 0, dragStep);
      return { ...state, steps: updatedSteps };
    case UPDATE_STEP_ATTRIBUTE:
      return {
        ...state,
        steps: state.steps.map((step, i) =>
          i === action.payload.index
            ? {
                ...step,
                [action.payload.key]: action.payload.value,
              }
            : step,
        ),
      };
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        steps: state.steps.map((step, i) =>
          i === action.payload ? { ...step, isChecked: !step.isChecked } : step,
        ),
      };
    default:
      return state;
  }
};

export const StepsProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(stepsReducer, initialState);

  return (
    <StepsContext.Provider value={{ state, dispatch }}>
      {children}
    </StepsContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StepsContext);
  if (context === undefined) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context.state;
};
