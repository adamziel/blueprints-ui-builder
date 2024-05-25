import { useFormikContext } from "formik";
import { BlueprintFormState } from "./components/MainForm";
import { useState } from "react";

export function useFormikFieldProps(name: string) {
  const { getFieldProps, getFieldMeta } =
    useFormikContext<BlueprintFormState>();
  const { touched, error } = getFieldMeta(name);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const fieldProps = getFieldProps(name);
  return {
    ...fieldProps,
    onFocus: (e: any) => {
      setIsInputFocused(true);
    },
    onBlur: (e: any) => {
      setIsInputFocused(false);
      return fieldProps.onBlur(e);
    },
    error: !isInputFocused && touched && !!error,
    helperText: !isInputFocused && touched ? error : "",
  };
}
