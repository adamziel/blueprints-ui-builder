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

export interface ThemeOption {
  name: string;
  slug: string;
  thumbnail: string;
}

function decodeHtmlEntities(encodedString: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${encodedString}`,
    "text/html",
  );
  return dom.body.textContent;
}

function useQueryThemes(inputValue: string) {
  return useQuery<ThemeOption[]>(
    ["themes", inputValue],
    async () => {
      const response = await fetch(
        `https://api.wordpress.org/themes/info/1.2/?action=query_themes&request[per_page]=100&request[search]=${inputValue}`,
      );
      const responseData = await response.json();
      const decodedThemes = responseData.themes.map((theme: any) => ({
        name: decodeHtmlEntities(theme.name),
        slug: theme.slug,
        thumbnail: theme.screenshot_url,
      }));

      return decodedThemes;
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

const WordPressThemeAutocompleteField: React.FC<Props> = (props) => {
  const { getValues } = useBlueprintFormContext();
  const [open, setOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    getValues(props.name) || "",
  );
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data: options, isFetching } = useQueryThemes(debouncedInputValue);

  const getOptionLabel = (option: string | ThemeOption) => {
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
        props.onChange?.(event as any);
        setInputValue(newInputValue);
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
          label="Select WordPress Theme or enter URL"
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

export default WordPressThemeAutocompleteField;
