import React from "react";
import { ListItemText, StepProps, Box } from "@mui/material";
import WordPressPluginAutocompleteField from "../forms/WordPressPluginAutocompleteField";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import Resource from "../forms/Resource";
import { CheckboxElement } from "react-hook-form-mui";

const InstallPluginStep: React.FC<StepProps> = ({ index }) => {
  const { register, control, getValues } = useBlueprintFormContext();
  return (
    <>
      <ListItemText sx={{ flexGrow: 0 }} primary={"Install plugin"} />

      <Resource
        name={`steps[${index}].pluginZipFile`}
        disableRawData
        additionalTypes={{
          ".org-directory": () => (
            <WordPressPluginAutocompleteField
              sx={{ flexGrow: 1 }}
              name={`steps[${index}].pluginZipFile.value.directorySlug` as any}
            />
          ),
        }}
      />

      <Box>
        <CheckboxElement
          name={`steps[${index}].activate`}
          label={"Activate"}
          control={control}
        />
      </Box>
    </>
  );
};

export default InstallPluginStep;
