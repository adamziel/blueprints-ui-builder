import { useFormContext } from "react-hook-form";

const errorMessages = {
  required: "This field is required",
  pattern: "Invalid format",
};

export function useBlueprintFormContext(): ReturnType<typeof useFormContext> {
  const form = useFormContext();

  return {
    ...form,
    register: ((name: string, options: any) => {
      const fieldProps = form.register(name, options);
      const fieldState = form.getFieldState(name);
      return {
        ...fieldProps,
        // onFocus: (e: any) => {
        //   setIsInputFocused(true);
        // },
        // onBlur: (e: any) => {
        //   setIsInputFocused(false);
        //   return fieldProps.onBlur(e);
        // },
        // error: !isInputFocused && touched && !!error,
        // helperText: !isInputFocused && touched ? error : "",
        error: !!fieldState.error,
        helperText: !fieldState.error
          ? null
          : fieldState.error?.message ||
            (errorMessages as any)[fieldState.error?.type as any] ||
            "There was an error",
      };
    }) as any,
  };
}
