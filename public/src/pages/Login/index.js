import { useCallback } from "react";
import { Button, Container, TextInput } from "@mantine/core";
import { Formik } from "formik";
import { useClient } from "components/client";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const client = useClient();
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (value, { setSubmitting }) => {
    console.log("SUBMIT", value);
    try {
      await client.authenticate({
        email: value.username,
        password: value.password,
        strategy: "local",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  }, []);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div>Login</div>
            <Container>
              <TextInput
                name="username"
                title="Username"
                value={values["username"]}
                onChange={handleChange}
              />
              <TextInput
                name="password"
                title="password"
                value={values["password"]}
                type="password"
                onChange={handleChange}
              />
              <Button type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </Container>
          </div>
        </form>
      )}
    </Formik>
  );
};
