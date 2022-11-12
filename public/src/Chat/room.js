import { Button, Flex, TextInput } from "@mantine/core";
import { Formik } from "formik";
import { useCallback } from "react";

export const Room = ({ id }) => {
  const handleSubmit = useCallback((value, { setSubmitting }) => {
    console.log("send", value);
    setSubmitting(false);
  }, []);
  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {({ values, handleSubmit, handleChange, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex h={"100%"} style={{ flexDirection: "column" }}>
            <Flex style={{ flexGrow: 1 }}>
              <div>TEXT</div>
            </Flex>
            <Flex>
              <TextInput
                name="content"
                text="Type here"
                values={values["content"]}
                onChange={handleChange}
              />
              <Button type="submit" loading={isSubmitting}>
                Kirim
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </Formik>
  );
};
