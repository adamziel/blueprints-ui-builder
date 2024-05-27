import React from "react";
import StepsList from "./StepsList";
import { createStep, StepModel, StepsMeta } from "../model";
import { Box, Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { useForm, FormProvider } from "react-hook-form";

const initialState = {
  steps: Object.values(StepsMeta).map((meta) =>
    createStep(meta.slug),
  ) as StepModel[],
};
export type BlueprintFormState = typeof initialState;

const App: React.FC = () => {
  const methods = useForm<BlueprintFormState>({
    defaultValues: initialState,
    shouldUseNativeValidation: false,
    // mode: "onSubmit",
    // reValidateMode: "onSubmit",
    // shouldFocusError: false,
  });
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const submitted = await methods.handleSubmit(
      (data) => {
        console.log("DATA", data);
      },
      (arg) => {
        console.log("INVALID", arg);
      },
    )();
    methods.trigger();
    console.log({ submitted });
    console.log("ERRORS", methods.formState.errors);
  };
  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "80%",
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
        >
          {/* {JSON.stringify(methods.formState.errors, null, 4)} */}

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{
              flexGrow: 1,
              gap: 2,
              margin: 0,
              flexWrap: "wrap",
            }}
          >
            <Sidebar />
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              sx={{ flexGrow: 1 }}
            >
              <StepsList />
            </Box>
          </Box>

          <pre style={{ textAlign: "left", flexBasis: "100%" }}>
            {JSON.stringify(methods.getValues(), null, 4)}
          </pre>
        </form>
      </FormProvider>
    </Box>
  );
};

export default App;
