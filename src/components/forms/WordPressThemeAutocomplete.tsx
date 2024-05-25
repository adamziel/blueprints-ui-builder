import { useState } from "react";
import { useQuery } from "react-query";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  AutocompleteProps,
  StyledComponentProps,
  SxProps,
  Theme,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { isValidPluginSlug, isValidUrl } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useFormikFieldProps } from "../../use-formik-form-fields-props";

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

interface Props {
  stepIndex: number;
  stepAttribute: string;
  sx?: SxProps<Theme>;
}

const WordPressThemeAutocomplete: React.FC<Props> = ({
  stepIndex,
  stepAttribute,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const fieldProps = useFormikFieldProps(
    `steps[${stepIndex}].${stepAttribute}`,
  );

  const inputValue = fieldProps.value || "";
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
      sx={rest.sx}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options || []}
      loading={isFetching}
      freeSolo
      filterOptions={(x) => x}
      getOptionLabel={getOptionLabel}
      onInputChange={(event, newInputValue) => {
        fieldProps.onChange({
          target: {
            value: newInputValue,
            name: fieldProps.name,
          },
        });
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
          {...fieldProps}
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

export default WordPressThemeAutocomplete;
