import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { signupUser } from "../utils/helpers";
import { FormProps } from "../utils/constant";
import TextInput from "../Components/TextInput";

const Signup: FC = () => {
  const [commonError, setCommonError] = useState<string>("");
  const navigate = useNavigate();
  // Call function from helpers to handle signup
  const handleSubmit = (values: FormProps) => {
    setCommonError("");
    const payload = values;
    delete payload.cpassword;
    const res = signupUser(values);
    if (res?.status === 201) {
      navigate("/login");
    } else {
      setCommonError(res?.message);
    }
  };

  // Signup form validation schemas
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^\S.*\S$/, "Remove extra spaces."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^\S*$/, "No spaces allowed")
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Signup form initial value
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
          Signup
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
            const { name, email, password, cpassword } = values;
            const {
              name: errName,
              email: errEmail,
              password: errPasssword,
              cpassword: errCPassword,
            } = errors;

            return (
              <Box component="form" onSubmit={handleSubmit}>
                <TextInput
                  sx={{ marginBottom: 2, marginTop: 3 }}
                  id="name"
                  label="Name"
                  helperText={errName}
                  value={name}
                  onChange={handleChange}
                />

                <TextInput
                  sx={{ marginBottom: 2 }}
                  id="email"
                  label="Email"
                  helperText={errEmail}
                  value={email}
                  onChange={handleChange}
                />
                <TextInput
                  sx={{ marginBottom: 2 }}
                  id="password"
                  label="Password"
                  type="password"
                  helperText={errPasssword}
                  value={password}
                  onChange={handleChange}
                />
                <TextInput
                  sx={{ marginBottom: 2 }}
                  id="cpassword"
                  label="Confirm Password"
                  type="password"
                  helperText={errCPassword}
                  value={cpassword}
                  onChange={handleChange}
                />
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Already have an account? <Link to="/signin">Sign in</Link>
                </Typography>
                <FormControl fullWidth>
                  <Button type="submit" variant="contained" color="success">
                    Signup
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

export default Signup;
