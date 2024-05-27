import React from "react";
import StepsList from "./StepsList";
import { StepModel, StepsMeta } from "../model/steps";
import { Box, Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

const initialState = {
  steps: Object.values(StepsMeta).map((meta) => ({
    step: meta.slug,
    ...(meta.defaultValues || {}),
  })) as StepModel[],
};
export type BlueprintFormState = typeof initialState;

const App: React.FC = () => {
  const methods = useForm<BlueprintFormState>({
    defaultValues: initialState,
  });
  console.log(methods);
  console.log("ERRORS", methods.formState.errors);
  const onSubmit: SubmitHandler<BlueprintFormState> = (data) =>
    console.log("ERRORS", methods.formState.errors);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* {JSON.stringify(methods.formState.errors, null, 4)} */}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ flexGrow: 1, gap: 2, margin: 0, flexWrap: "wrap" }}
        >
          <Sidebar />
          <StepsList />
        </Box>

        <pre style={{ textAlign: "left", flexBasis: "100%" }}>
          {JSON.stringify(methods.getValues(), null, 4)}
        </pre>
      </form>
    </FormProvider>
  );
};

export default App;
