// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepModel {
  step: string;
  [key: string]: any;
}

interface ApplicationState {
  steps: StepModel[];
  placeholderIndex: number | null;
}

const initialSteps: StepModel[] = [
  { step: "installPlugin", activate: true },
  { step: "activatePlugin" },
  { step: "mv" },
  { step: "cp" },
  { step: "defineWpConfigConstants" },
];

const initialState: ApplicationState = {
  steps: initialSteps,
  placeholderIndex: null,
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setPlaceholderIndex(state, action: PayloadAction<number | null>) {
      state.placeholderIndex = action.payload;
    },
    addStep(state, action: PayloadAction<StepModel>) {
      state.steps.push(action.payload);
    },
    insertStep(
      state,
      action: PayloadAction<{ index: number; step: StepModel }>,
    ) {
      state.steps.splice(action.payload.index, 0, action.payload.step);
      state.placeholderIndex = null;
    },
    removeStep(state, action: PayloadAction<number>) {
      state.steps.splice(action.payload, 1);
    },
    swapSteps(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) {
      let { dragIndex, hoverIndex } = action.payload;
      if (dragIndex < hoverIndex) {
        --hoverIndex;
      }
      const [draggedStep] = state.steps.splice(dragIndex, 1);
      state.steps.splice(hoverIndex, 0, draggedStep);
    },
    updateStepAttribute(
      state,
      action: PayloadAction<{ index: number; key: string; value: any }>,
    ) {
      const { index, key, value } = action.payload;
      state.steps[index][key] = value;
    },
    toggleCheckbox(state, action: PayloadAction<number>) {
      const step = state.steps[action.payload];
      step.isChecked = !step.isChecked;
    },
  },
});

export const {
  setPlaceholderIndex,
  addStep,
  insertStep,
  removeStep,
  swapSteps,
  updateStepAttribute,
  toggleCheckbox,
} = stepsSlice.actions;

export default stepsSlice.reducer;

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
