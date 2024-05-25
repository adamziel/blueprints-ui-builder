import React from "react";

const RequiredOnBlur: React.FC<any> = React.forwardRef(function (props, ref) {
  const [didBlur, setDidBlur] = React.useState(false);
  function onBlur(e: any) {
    if (!didBlur) {
      setDidBlur(true);
      props.onBlur?.(e);
    }
  }
  let error = props.error;
  let helperText = props.helperText;
  if (didBlur && !props.value && !error) {
    error = true;
    helperText = props.message || "Required";
  }
  return React.cloneElement(props.children, {
    ...props.children.props,
    onBlur,
    error,
    helperText,
  });
});
export default RequiredOnBlur;
