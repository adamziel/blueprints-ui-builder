import { useContext } from "react";
import { StepModel, StepsContext } from "./StepsContext";

export const SET_PLACEHOLDER_INDEX = 'SET_PLACEHOLDER_INDEX';
export const setPlaceholderIndex = (index: number | null) => ({
  type: SET_PLACEHOLDER_INDEX,
  payload: index,
});
export type SetPlaceholderTypeAction = ReturnType<typeof setPlaceholderIndex>;

export const ADD_STEP = 'ADD_STEP';
export const addStep = (step: StepModel) => ({
  type: ADD_STEP,
  payload: step,
});
export type AddStepAction = ReturnType<typeof addStep>;

export const INSERT_STEP = 'INSERT_STEP';
export const insertStep = (index: number, step: StepModel) => ({
  type: INSERT_STEP,
  payload: { index, step },
});
export type InsertStepAction = ReturnType<typeof insertStep>;

export const REMOVE_STEP = 'REMOVE_STEP';
export const removeStep = (index: number) => ({
  type: REMOVE_STEP,
  payload: index,
});
export type RemoveStepAction = ReturnType<typeof removeStep>;

export const MOVE_STEP = 'MOVE_STEP';
export const swapSteps = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_STEP,
  payload: { dragIndex, hoverIndex },
});
export type SwapStepsAction = ReturnType<typeof swapSteps>;

export const UPDATE_STEP_ATTRIBUTE = 'UPDATE_STEP_ATTRIBUTE';
export const updateStepAttribute = (index: number, key: string, value: any) => ({
  type: UPDATE_STEP_ATTRIBUTE,
  payload: { index, key, value },
});
export type UpdateStepAttributeAction = ReturnType<typeof updateStepAttribute>;

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const toggleCheckbox = (index: number) => ({
  type: TOGGLE_CHECKBOX,
  payload: index,
});
export type ToggleCheckboxAction = ReturnType<typeof toggleCheckbox>;
  
  export function useDispatch() {
    const { dispatch } = useContext(StepsContext)!;
    const actions = {
      setPlaceholderIndex,
      addStep,
      insertStep,
      removeStep,
      swapSteps,
      updateStepAttribute,
    };
    const boundActions = {} as any;
    for (const name in actions) {
      boundActions[name] = function (...args: any[]) {
        dispatch((actions as any)[name](...args));
      } as any;
    }
    
    return boundActions as typeof actions;
  }

export type Action = 
    | AddStepAction
  | AddStepAction
 | InsertStepAction
|  RemoveStepAction
  |SwapStepsAction
 | UpdateStepAttributeAction
| SetPlaceholderTypeAction