// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepModel {
  step: string;
  [key: string]: any;
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

export type StepSlug = keyof StepMeta;

export function createStep(slug: string): StepModel {
  return {
    step: slug,
    ...(StepsMeta[slug]?.defaultValues || {}),
  };
}

// const stepsSlice = createSlice({
//   name: "steps",
//   initialState,
//   reducers: {
//     addStep(state, action: PayloadAction<StepModel>) {
//       state.push(action.payload);
//     },
//     insertStep(
//       state,
//       action: PayloadAction<{ index: number; step: StepModel }>,
//     ) {
//       state.splice(action.payload.index, 0, action.payload.step);
//     },
//     removeStep(state, action: PayloadAction<number>) {
//       state.splice(action.payload, 1);
//     },
//     swapSteps(
//       state,
//       action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
//     ) {
//       let { dragIndex, hoverIndex } = action.payload;
//       if (dragIndex < hoverIndex) {
//         --hoverIndex;
//       }
//       const [draggedStep] = state.splice(dragIndex, 1);
//       state.splice(hoverIndex, 0, draggedStep);
//     },
//     updateStepAttribute(
//       state,
//       action: PayloadAction<{ index: number; key: string; value: any }>,
//     ) {
//       const { index, key, value } = action.payload;
//       state[index][key] = value;
//     },
//     toggleCheckbox(state, action: PayloadAction<number>) {
//       const step = state[action.payload];
//       step.isChecked = !step.isChecked;
//     },
//   },
// });

// export const {
//   addStep,
//   insertStep,
//   removeStep,
//   swapSteps,
//   updateStepAttribute,
//   toggleCheckbox,
// } = stepsSlice.actions;

// export default stepsSlice.reducer;
