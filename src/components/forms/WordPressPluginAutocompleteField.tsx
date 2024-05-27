import { useState } from "react";
import { useQuery } from "react-query";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import { useBlueprintFormContext } from "../../use-blueprint-form-context";
import { Controller } from "react-hook-form";
import { isValidPluginSlug } from "../utils";

export interface PluginOption {
  name: string;
  slug: string;
}

function decodeHtmlEntities(encodedString: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${encodedString}`,
    "text/html",
  );
  return dom.body.textContent;
}

function useQueryPlugins(inputValue: string) {
  return useQuery<PluginOption[]>(
    ["plugins", inputValue],
    async () => {
      const response = await fetch(
        `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[search]=${inputValue}`,
      );
      const responseData = await response.json();
      const decodedPlugins = responseData.plugins.map((plugin: any) => ({
        name: decodeHtmlEntities(plugin.name),
        slug: plugin.slug,
      }));

      return decodedPlugins;
    },
    {
      enabled: inputValue.trim().length > 0,
      initialData: [],
    },
  );
}

type Props<Variant extends TextFieldVariants = TextFieldVariants> =
  TextFieldProps<Variant> & {
    name: string;
  };

function isWpOrgSlug(value: any) {
  if (!isValidPluginSlug(normalizeValue(value))) {
    return "Enter a valid theme slug";
  }
}

function normalizeValue(value: string | PluginOption | null | undefined) {
  if (!value) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return value.slug;
}
const WordPressPluginAutocompleteField: React.FC<Props> = (props) => {
  const { getValues, control } = useBlueprintFormContext();

  const [inputValue, setInputValue] = useState(
    normalizeValue(getValues(props.name) as string),
  );
  const value = inputValue;
  const [debouncedInputValue] = useDebounce(value, 500);
  const { data: options, isFetching } = useQueryPlugins(debouncedInputValue);

  const getOptionLabel = (option: string | PluginOption) => {
    if (typeof option === "string") {
      return option;
    } else {
      return option.slug;
    }
  };

  return (
    <Controller
      control={control}
      rules={{ required: true, validate: isWpOrgSlug }}
      name={props.name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Autocomplete
          onBlur={onBlur}
          onChange={(e, v) => {
            onChange(v);
            setInputValue(normalizeValue(v));
          }}
          value={value || { slug: "", label: "" }}
          inputValue={normalizeValue(value)}
          onInputChange={(e, v) => {
            onChange(v);
            setInputValue(normalizeValue(v));
          }}
          isOptionEqualToValue={(option, value) =>
            normalizeValue(option) === normalizeValue(value)
          }
          getOptionLabel={getOptionLabel}
          autoSelect
          fullWidth
          options={options || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Plugin slug in the WordPress.org directory"
              fullWidth
              ref={ref}
              error={!!error}
              helperText={error && error.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          loading={isFetching}
          renderOption={({ key, ...props }: any, option: any) => {
            return (
              <Box component="li" {...props} key={option.slug}>
                <Typography>{option.name}</Typography>
              </Box>
            );
          }}
        />
      )}
    />
  );
};

export default WordPressPluginAutocompleteField;
