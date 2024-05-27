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
    label: "Import WXR"
  },
  installPlugin: {
    slug: "installPlugin",
    label: "Install Plugin",
    defaultValues: {
      activate: true
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
