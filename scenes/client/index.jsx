import React from 'react';
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Reports" subtitle="Create a Report" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Staff Hours"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.staffHours}
                name="staffHours"
                error={!!touched.staffHours && !!errors.staffHours}
                helperText={touched.staffHours && errors.staffHours}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Volunteer Hours"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.volunteerHours}
                name="volunteerHours"
                error={!!touched.volunteerHours && !!errors.volunteerHours}
                helperText={touched.volunteerHours && errors.volunteerHours}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Departments"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="">Select Department</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                {/* Add more departments as needed */}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Organization Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organizationName}
                name="organizationName"
                error={!!touched.organizationName && !!errors.organizationName}
                helperText={touched.organizationName && errors.organizationName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Focused Population"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.focusedPopulation}
                name="focusedPopulation"
                error={!!touched.focusedPopulation && !!errors.focusedPopulation}
                helperText={touched.focusedPopulation && errors.focusedPopulation}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="">Select Focused Population</MenuItem>
                <MenuItem value="Broader Community">Broader Community</MenuItem>
                <MenuItem value="Living in Poverty">Living in Poverty</MenuItem>
                {/* Add more options as needed */}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  staffHours: yup.number().required("required").positive("Hours must be positive"),
  volunteerHours: yup.number().required("required").positive("Hours must be positive"),
  department: yup.string().required("required"),
  organizationName: yup.string().required("required"),
  focusedPopulation: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  staffHours: "",
  volunteerHours: "",
  department: "",
  organizationName: "",
  focusedPopulation: "",
};

export default Form;
