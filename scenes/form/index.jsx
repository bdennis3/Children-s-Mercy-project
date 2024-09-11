import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openDialog, setOpenDialog] = useState(false); // State for dialog

  // Define validation schema using yup
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    contact: yup.string().required("Contact number is required"),
    staffHours: yup.number().required("Staff hours are required").positive("Hours must be positive"),
    volunteerHours: yup.number().required("Volunteer hours are required").positive("Hours must be positive"),
    department: yup.string().required("Department is required"),
    eventDescription: yup.string().required("Event description is required"),
  });

  // Initial values for the form fields
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    staffHours: "",
    volunteerHours: "",
    department: "",
    eventDescription: "",
  };

  const handleFormSubmit = (values) => {
    console.log(values); // Log values to console (or handle form submission logic)
    setOpenDialog(true); // Open confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close confirmation dialog
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
                <MenuItem value="Pediactrics">Pediactrics</MenuItem>
                <MenuItem value="Oncology">Oncology</MenuItem>
                <MenuItem value="Rheumatology">Rheumatology</MenuItem>
                <MenuItem value="Gastroenterology">Gastroenterology</MenuItem>
                {/* Add more departments as needed */}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Event Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.eventDescription}
                name="eventDescription"
                error={!!touched.eventDescription && !!errors.eventDescription}
                helperText={touched.eventDescription && errors.eventDescription}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Make sure information is put in accurately for admin!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
