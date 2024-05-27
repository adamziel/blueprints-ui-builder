import React from "react";
import { ListItemText, Box } from "@mui/material";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import { StepProps } from "../step-helpers/Step";
import WordPressThemeAutocompleteField from "../forms/WordPressThemeAutocompleteField";
import Resource from "../forms/Resource";
import { CheckboxElement } from "react-hook-form-mui";

const InstallThemeStep: React.FC<StepProps> = ({ index }) => {
  const { control, getValues } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install theme"} />

      <Resource
        name={`steps[${index}].themeZipFile`}
        disableRawData
        additionalTypes={{
          ".org-directory": () => (
            <WordPressThemeAutocompleteField
              sx={{ flexGrow: 1 }}
              name={`steps[${index}].themeZipFile.value.directorySlug` as any}
            />
          ),
        }}
      />

      <Box>
        <CheckboxElement
          name={`steps[${index}].activate`}
          label="Activate"
          control={control}
          checked={getValues(`steps[${index}].activate`) || false}
        />
      </Box>
    </>
  );
};

export default InstallThemeStep;
