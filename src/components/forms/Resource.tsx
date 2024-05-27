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
  const { register } = useBlueprintFormContext();

  const [type, setType] = useState<string>("URL");
  const typeField = (register as any)(
    `${name}.type`,
    { required: true },
    { withHelperText: false },
  );
  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    typeField.onChange(event);
  };

  return (
    <>
      <FormControl component="fieldset" sx={{ minWidth: 150 }}>
        <InputLabel>{selectLabel}</InputLabel>
        <Select
          label={selectLabel}
          {...typeField}
          defaultValue="URL"
          onChange={handleTypeChange}
        >
          <MenuItem value="URL">URL</MenuItem>
          <MenuItem value="VFS">VFS path</MenuItem>
          {!disableRawData && <MenuItem value="raw">Raw data</MenuItem>}
          <MenuItem value="localFile">Local file</MenuItem>
          {Object.keys(additionalTypes).map((key) => (
            <MenuItem value={key} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "URL" && (
        <TextField
          label="URL"
          sx={{ margin: 0 }}
          {...register(`${name}.value.URL`, { required: true })}
          margin="normal"
        />
      )}
      {type === "VFS" && (
        <TextField
          label="VFS"
          sx={{ margin: 0 }}
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
          sx={{ margin: 0 }}
          {...register(`${name}.value.raw`, { required: true })}
        />
      )}
      {type === "localFile" && (
        <input
          type="file"
          {...register(`${name}.value.localFile`, {
            required: true,
          })}
          style={{ margin: 0 }}
        />
      )}
      {type in additionalTypes && additionalTypes[type]({ name })}
    </>
  );
};

export default Resource;
