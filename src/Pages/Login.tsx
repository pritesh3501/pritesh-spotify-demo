import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, FormControl, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginUser } from "../utils/helpers";
import TextInput from "../Components/TextInput";
import { FormProps } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/globalSlice";

const Login: FC = () => {
  const dispatch = useDispatch();
  const [commonError, setCommonError] = useState<string>("");

  // Call function from helpers to handle login
  const handleSubmit = (values: FormProps) => {
    setCommonError("");
    const res = loginUser(values);

    if (res?.status === 200) {
      dispatch(setAuthData(res?.data));
      localStorage.authData = res?.data;
    } else {
      setCommonError(res?.message);
    }
  };

  // Login form validation schemas
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string().required("Password is required"),
  });

  // Login form initial value
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" marginBottom={2}>
          Signin
        </Typography>
        <Typography variant="body2" fontWeight="normal">
          Welcome user, please sign in to continue
        </Typography>
        {commonError && (
          <Typography
            variant="body2"
            fontWeight="normal"
            sx={{ marginTop: 2 }}
            color="red"
          >
            {commonError}
          </Typography>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, errors, handleChange, handleSubmit } = props;
            const { email, password } = values;
            const { email: errEmail, password: errPasssword } = errors;

            return (
              <Box component="form" onSubmit={handleSubmit}>
                <TextInput
                  sx={{ marginBottom: 2, marginTop: 3 }}
                  id="email"
                  label="Email"
                  helperText={errEmail}
                  value={email}
                  onChange={handleChange}
                />
                <TextInput
                  sx={{ marginBottom: 2 }}
                  type="password"
                  id="password"
                  label="Password"
                  helperText={errPasssword}
                  value={password}
                  onChange={handleChange}
                />

                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </Typography>
                <FormControl fullWidth>
                  <Button type="submit" variant="contained" color="success">
                    Login
                  </Button>
                </FormControl>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
