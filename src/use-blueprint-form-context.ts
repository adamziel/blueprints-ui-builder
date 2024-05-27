import { useFormContext } from "react-hook-form";

const errorMessages = {
  required: "This field is required",
  pattern: "Invalid format",
};

export function useBlueprintFormContext(): ReturnType<typeof useFormContext> {
  const form = useFormContext();

  return {
    ...form,
    register: ((name: string, options: any, { withHelperText }: any = {}) => {
      const fieldProps = form.register(name, options);
      const fieldState = form.getFieldState(name);
      const props = {
        ...fieldProps,
        error: !!fieldState.error,
      } as any;
      if (withHelperText !== false) {
        props.helperText = !fieldState.error
          ? null
          : fieldState.error?.message ||
            (errorMessages as any)[fieldState.error?.type as any] ||
            "There was an error";
      }
      return props;
    }) as any,
  };
}
