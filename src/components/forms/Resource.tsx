import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";

interface ResourceProps {
  name: string;
  selectLabel?: string;
  additionalTypes?: { [key: string]: any };
  disableRawData?: boolean;
}

const Resource: React.FC<ResourceProps> = ({
  name,
  selectLabel = "Data source",
  additionalTypes = {},
  disableRawData = false,
}) => {
  const { register, setValue } = useBlueprintFormContext();

  const [type, setType] = useState<string>("URL");
  const typeField = register(`${name}.type`, { required: true });
  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    typeField.onChange(event);
  };

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <InputLabel>{selectLabel}</InputLabel>
        <Select label={selectLabel} {...typeField} onChange={handleTypeChange}>
          <MenuItem value="URL">URL</MenuItem>
          <MenuItem value="VFS">VFS path</MenuItem>
          {!disableRawData && <MenuItem value="raw">Raw data</MenuItem>}
          <MenuItem value="localFile">Local file</MenuItem>
          {Object.keys(additionalTypes).map((key) => (
            <MenuItem value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "URL" && (
        <TextField
          fullWidth
          label="URL"
          {...register(`${name}.value.URL`, { required: true })}
          margin="normal"
        />
      )}
      {type === "VFS" && (
        <TextField
          fullWidth
          label="VFS"
          {...register(`${name}.value.VFS`, { required: true })}
          margin="normal"
        />
      )}
      {type === "raw" && (
        <TextField
          label="Contents"
          variant="outlined"
          multiline
          rows={4}
          {...register(`${name}.value.raw`, { required: true })}
        />
      )}
      {type === "localFile" && (
        <input
          type="file"
          {...register(`${name}.value.localFile`, {
            required: true,
          })}
          style={{ marginTop: 16 }}
        />
      )}
      {type in additionalTypes && additionalTypes[type]}
    </>
  );
};

export default Resource;
