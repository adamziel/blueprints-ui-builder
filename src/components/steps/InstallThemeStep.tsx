import React from "react";
import { ListItemText, Checkbox, FormControlLabel } from "@mui/material";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import { StepProps } from "../step-helpers/Step";
import WordPressThemeAutocompleteField from "../forms/WordPressThemeAutocompleteField";
import { isValidUrl, isValidPluginSlug } from "../utils";

function isWpOrgSlug(value: string) {
  if (!isValidUrl(value) && !isValidPluginSlug(value)) {
    return "Enter a valid theme slug or URL";
  }
}

const InstallThemeStep: React.FC<StepProps> = ({ index }) => {
  const { register } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install theme"} />

      <WordPressThemeAutocompleteField
        sx={{ flexGrow: 1 }}
        {...register(`steps[${index}].themeZipFile`, {
          required: true,
          validate: isWpOrgSlug,
        })}
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

export default InstallThemeStep;
