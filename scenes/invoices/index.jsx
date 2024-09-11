import React, { useState } from 'react';
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to hold the invoices data
  const [invoices, setInvoices] = useState(mockDataInvoices);

  // Function to handle type change
  const handleTypeChange = (id, value) => {
    // Update invoices state with the selected type
    const updatedInvoices = invoices.map(row => 
      row.id === id ? { ...row, type: value } : row
    );
    setInvoices(updatedInvoices);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Hours",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.cost}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.row.type || ""}
          onChange={(e) => handleTypeChange(params.row.id, e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="volunteer">Volunteer Hours</MenuItem>
          <MenuItem value="work">Work Hours</MenuItem>
        </Select>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Hours" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={invoices} // Use the invoices state here
          columns={columns} 
          rowHeight={45} 
        />
      </Box>
    </Box>
  );
};

export default Invoices;
