import React, { createContext, useContext, useReducer } from 'react';
import { StepData } from '../types';
import { SET_PLACEHOLDER_INDEX, UPDATE_STEP_ATTRIBUTE, ADD_STEP, INSERT_STEP, MOVE_STEP, REMOVE_STEP, TOGGLE_CHECKBOX } from './actions';

interface StepsState {
  steps: StepData[];
  placeholderIndex: number | null;
}

interface StepsContextProps {
  state: StepsState;
  dispatch: React.Dispatch<any>;
}

export interface StepDefinition {
  id: string;
  name: string;
  defaultValues?: Record<string, any>
}
export const StepDefinitions: Record<string, StepDefinition> = {
  installPlugin: {
    id: 'installPlugin',
    name: 'installPlugin',
    defaultValues: {
      activate: true
    }
  },
  activatePlugin: {
    id: 'activatePlugin',
    name: 'activatePlugin',
  },
  mv: {
    id:'mv',
    name: 'mv', 
  },
  cp: {
    id:'cp',
    name: 'cp', 
  },
  defineWpConfigConstants: {
    id: 'defineWpConfigConstants',
    name: 'defineWpConfigConstants',
  },
} as const

export type StepSlug = keyof StepDefinition;

export function createStep(slug: string): StepData {
  return {
    key: slug,
    ...(StepDefinitions[slug]?.defaultValues || {})
  }
}

const initialSteps: StepData[] = [
  createStep('installPlugin'),
  createStep('activatePlugin'),
  createStep('mv'),
  createStep('cp'),
  createStep('defineWpConfigConstants'),
];

const initialState: StepsState = {
  steps: initialSteps,
  placeholderIndex: null,
};

export const StepsContext = createContext<StepsContextProps | undefined>(undefined);


const stepsReducer = (state: StepsState, action: any): StepsState => {
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
      return { ...state, steps: state.steps.filter((_, i) => i !== action.payload) };
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
              [action.payload.key]: action.payload.value
            }
            : step
        ),
      };
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        steps: state.steps.map((step, i) =>
          i === action.payload ? { ...step, isChecked: !step.isChecked } : step
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
    throw new Error('useSteps must be used within a StepsProvider');
  }
  return context.state;
};
