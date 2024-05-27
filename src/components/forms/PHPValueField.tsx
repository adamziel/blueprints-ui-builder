import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

type Props = {
  name: string;
  selectLabel?: string;
  textFieldLabel?: string;
};

const PhpValueField: React.FC<Props> = ({
  name,
  selectLabel = "Data type",
  textFieldLabel = "Value",
}) => {
  const { register, getValues, setValue } = useBlueprintFormContext();
  const value = getValues(name);

  const [type, setType] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (typeof value === "string") {
      setType("string");
      setInputValue(value);
    } else if (typeof value === "number") {
      setType("number");
      setInputValue(value.toString());
    } else if (typeof value === "boolean") {
      setType(value ? "boolean true" : "boolean false");
      setInputValue("");
    } else if (value === null) {
      setType("null");
      setInputValue("");
    }
  }, [value]);

  const handleOnChange = (newValue: any) => {
    setValue(name, newValue);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newType = event.target.value as string;
    setType(newType);
    switch (newType) {
      case "string":
        handleOnChange("");
        setInputValue("");
        break;
      case "number":
        handleOnChange(0);
        setInputValue("0");
        break;
      case "boolean true":
        handleOnChange(true);
        setInputValue("");
        break;
      case "boolean false":
        handleOnChange(false);
        setInputValue("");
        break;
      case "null":
        handleOnChange(null);
        setInputValue("");
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (type === "string") {
      handleOnChange(newValue);
    } else if (type === "number") {
      handleOnChange(Number(newValue));
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <FormControl variant="outlined" sx={{ mr: 1, minWidth: 180 }}>
        <InputLabel>{selectLabel}</InputLabel>
        <Select
          value={type}
          label={selectLabel}
          {...register(`${name}.type`, { required: true })}
          onChange={handleTypeChange as any}
        >
          <MenuItem value="string">string</MenuItem>
          <MenuItem value="number">number</MenuItem>
          <MenuItem value="boolean false">boolean false</MenuItem>
          <MenuItem value="boolean true">boolean true</MenuItem>
          <MenuItem value="null">null</MenuItem>
        </Select>
      </FormControl>
      {(type === "string" || type === "number") && (
        <TextField
          variant="outlined"
          value={inputValue}
          label={textFieldLabel}
          {...register(`${name}.value`)}
          onChange={handleInputChange}
        />
      )}
    </Box>
  );
};

export default PhpValueField;
