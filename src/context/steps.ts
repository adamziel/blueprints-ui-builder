// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepModel {
  step: string;
  [key: string]: any;
}

interface ApplicationState {
  steps: StepModel[];
  dropIndex: number | null;
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
  installTheme: {
    slug: "installTheme",
    label: "Install Theme",
    defaultValues: {
      activate: true,
    },
  },
  activatePlugin: {
    slug: "activatePlugin",
    label: "Activate Plugin",
  },
  activateTheme: {
    slug: "activateTheme",
    label: "Activate Theme",
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

const initialSteps: StepModel[] = Object.values(StepsMeta).map((meta) => ({
  step: meta.slug,
  ...(meta.defaultValues || {}),
}));

const initialState: ApplicationState = {
  steps: initialSteps,
  dropIndex: null,
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setDropIndex(state, action: PayloadAction<number | null>) {
      state.dropIndex = action.payload;
    },
    addStep(state, action: PayloadAction<StepModel>) {
      state.steps.push(action.payload);
    },
    insertStep(
      state,
      action: PayloadAction<{ index: number; step: StepModel }>,
    ) {
      state.steps.splice(action.payload.index, 0, action.payload.step);
      state.dropIndex = null;
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
  setDropIndex,
  addStep,
  insertStep,
  removeStep,
  swapSteps,
  updateStepAttribute,
  toggleCheckbox,
} = stepsSlice.actions;

export default stepsSlice.reducer;

export type StepSlug = keyof StepMeta;

export function createStep(slug: string): StepModel {
  return {
    step: slug,
    ...(StepsMeta[slug]?.defaultValues || {}),
  };
}
