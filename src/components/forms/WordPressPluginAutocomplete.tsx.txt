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
} from "@mui/material";
import { isValidPluginSlug, isValidUrl } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { updateStepAttribute } from "../../context/steps";
import { useDebounce } from "use-debounce";

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

interface Props {
  stepIndex: number;
  stepAttribute: string;
  sx?: SxProps<Theme>;
}

const WordPressPluginAutocomplete: React.FC<Props> = ({
  stepIndex,
  stepAttribute,
  ...rest
}) => {
  const step = useSelector((state: RootState) => state.steps.steps[stepIndex]);
  const [open, setOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputValue = step[stepAttribute] || "";
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data: options, isFetching } = useQueryPlugins(debouncedInputValue);

  const dispatch = useDispatch();
  const handleInputChange = (event: any, newInputValue: any) => {
    dispatch(
      updateStepAttribute({
        index: stepIndex,
        key: stepAttribute,
        value: newInputValue,
      }),
    );
  };
  const getOptionLabel = (option: string | PluginOption) => {
    if (typeof option === "string") {
      return option;
    } else {
      return option.slug;
    }
  };
  const handleValidation = () => {
    if (isValidUrl(inputValue) || isValidPluginSlug(inputValue)) {
      return true;
    }
    return false;
  };

  const hasError = !isInputFocused && !handleValidation() && inputValue !== "";
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
      onInputChange={handleInputChange}
      getOptionLabel={getOptionLabel}
      renderOption={({ key, ...props }: any, option) => (
        <Box component="li" key={"option-" + option.slug} {...props}>
          {option.name} ({option.slug})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select WordPress Plugin or enter URL"
          variant="outlined"
          error={hasError}
          helperText={hasError ? "Enter a valid plugin slug or URL" : ""}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
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

export default WordPressPluginAutocomplete;
