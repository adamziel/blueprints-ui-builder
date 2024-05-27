import React from "react";
import {
  ListItemText,
  Checkbox,
  FormControlLabel,
  StepProps,
} from "@mui/material";
import WordPressPluginAutocompleteField from "../forms/WordPressPluginAutocompleteField";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import { isValidUrl, isValidPluginSlug } from "../utils";
import Resource from "../forms/Resource";

function isWpOrgSlug(value: string) {
  if (!isValidUrl(value) && !isValidPluginSlug(value)) {
    return "Enter a valid theme slug or URL";
  }
}

const InstallPluginStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install plugin"} />

      <Resource
        name={`steps[${index}].pluginZipFile`}
        disableRawData
        additionalTypes={{
          ".org-directory": (
            <WordPressPluginAutocompleteField
              sx={{ flexGrow: 1 }}
              fullWidth
              {...register(`steps[${index}].pluginZipFile.directory`, {
                required: true,
                validate: isWpOrgSlug,
              })}
            />
          ),
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            {...register(`steps[${index}].activate`)}
          />
        }
        label="Activate?"
      />
    </>
  );
};

export default InstallPluginStep;
