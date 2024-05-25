import React from "react";
import StepsListStructure from "./StepsList";
import { Formik } from "formik";
import * as Yup from "yup";
import { StepModel, StepsMeta } from "../model/steps";
import { Box, Button } from "@mui/material";
import { isValidUrl, isValidPluginSlug } from "./utils";

Yup.addMethod(Yup.string, "wporgSlug", function (errorMessage) {
  return this.test(
    `test-valid-wporg-slug`,
    errorMessage,
    function (value: any) {
      const { path, createError } = this;
      return (
        isValidUrl(value) ||
        isValidPluginSlug(value) ||
        createError({ path, message: "Enter a valid theme slug or URL" })
      );
    },
  );
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  steps: Yup.array().of(
    Yup.object().shape({
      step: Yup.string().required("Step is required"),
      fromPath: Yup.string().when("step", {
        is: "mv",
        then: () => Yup.string().required("From path is required"),
      }),
      toPath: Yup.string().when("step", {
        is: "mv",
        then: () => Yup.string().required("To path is required"),
      }),
      themeZipFile: Yup.string().when("step", {
        is: "installTheme",
        then: () =>
          (
            Yup.string().required("Theme zip file is required") as any
          ).wporgSlug(),
      }),
    }) as any,
  ),
});

const initialState = {
  steps: Object.values(StepsMeta).map((meta) => ({
    step: meta.slug,
    ...(meta.defaultValues || {}),
  })) as StepModel[],
};
export type BlueprintFormState = typeof initialState;

const App: React.FC = () => {
  return (
    <Formik<BlueprintFormState>
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors }) => (
        <>
          {JSON.stringify(errors, null, 4)}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{ flexGrow: 1, gap: 2, margin: 0, flexWrap: "wrap" }}
          >
            {/* <Sidebar /> */}
            <StepsListStructure />
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <pre style={{ textAlign: "left", flexBasis: "100%" }}>
            {JSON.stringify(values, null, 4)}
          </pre>
        </>
      )}
    </Formik>
  );
};

export default App;
