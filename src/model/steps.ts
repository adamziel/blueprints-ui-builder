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
  activatePlugin: {
    slug: "activatePlugin",
    label: "Activate Plugin",
  },
  activateTheme: {
    slug: "activateTheme",
    label: "Activate Theme",
  },
  cp: {
    slug: "cp",
    label: "Copy a file or directory",
  },
  defineWpConfigConstants: {
    slug: "defineWpConfigConstants",
    label: "Define a PHP constant",
  },
  enableMultisite: {
    slug: "enableMultisite",
    label: "Enable Multisite",
  },
  importWxr: {
    slug: "importWxr",
    label: "Import WXR",
  },
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
  login: {
    slug: "login",
    label: "Login",
  },
  mkDir: {
    slug: "mkDir",
    label: "Create a directory",
  },
  mv: {
    slug: "mv",
    label: "Move a file or directory",
  },
  rm: {
    slug: "rm",
    label: "Remove a file",
  },
  rmDir: {
    slug: "rmDir",
    label: "Remove a directory",
  },  
  runPHP: {
    slug: "runPHP",
    label: "Run PHP",
  },
  runSql: {
    slug: "runSql",
    label: "Run SQL",
  },
  setSiteOptions: {
    slug: "setSiteOptions",
    label: "Set site options",
  },
  unzip: {
    slug: "unzip",
    label: "Unzip a file",
  },
  ["wp-cli"]: {
    slug: "wp-cli",
    label: "Run WP-CLI command",
  },
  writeFile: {
    slug: "writeFile",
    label: "Write a file",
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
