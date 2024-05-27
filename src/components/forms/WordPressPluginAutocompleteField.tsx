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

const WordPressPluginAutocompleteField: React.FC<Props> = (props) => {
  const { getValues } = useBlueprintFormContext();
  const [open, setOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    getValues(props.name) || "",
  );
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data: options, isFetching } = useQueryPlugins(debouncedInputValue);

  const getOptionLabel = (option: string | PluginOption) => {
    if (typeof option === "string") {
      return option;
    } else {
      return option.slug;
    }
  };

  return (
    <Autocomplete
      sx={props.sx}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options || []}
      loading={isFetching}
      freeSolo
      filterOptions={(x) => x}
      getOptionLabel={getOptionLabel}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        props.onChange?.(event as any);
      }}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      renderOption={({ key, ...props }: any, option) => {
        if (!options) return null;
        return (
          <Box component="li" {...props} key={option.slug}>
            <Typography>{option.name}</Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          label="Select WordPress Plugin or enter a zip bundle URL"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isInputFocused && isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default WordPressPluginAutocompleteField;
