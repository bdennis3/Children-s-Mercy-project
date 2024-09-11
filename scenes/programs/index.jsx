import React, { useState } from 'react';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPrograms } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Program = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    title: '',
    category: '',
    method: '',
    focused: '',
    accessLevel: '',
    description: '',
  });

  const handleRowDoubleClick = (params) => {
    setEditFormData({
      id: params.row.id,
      title: params.row.title,
      category: params.row.category,
      method: params.row.method,
      focused: params.row.focused,
      accessLevel: params.row.accessLevel,
      description: params.row.description || '', // Ensure description is initialized
    });
    setEditDialogOpen(true);
  };

  const handleEditFormDataChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    // Update your data source with editFormData
    const updatedData = mockDataPrograms.map(row =>
      editFormData.id === row.id ? { ...row, ...editFormData } : row
    );
    console.log("Updated Data:", updatedData);
    // Example: updateData(updatedData);
    setEditDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "method",
      headerName: "Indirect Method",
      flex: 1,
    },
    {
      field: "focused",
      headerName: "Focused Population",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { access } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            access === "Active"
              ? colors.greenAccent[600]
              : access === "Not Active"
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {access === "Active" && <AdminPanelSettingsOutlinedIcon />}
          {access === "Not Active" && <SecurityOutlinedIcon />}
          {access === "In Progress" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Programs" subtitle="Which Programs are active" />
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
          rows={mockDataPrograms}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Program</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editFormData.title}
            onChange={handleEditFormDataChange}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            
            value={editFormData.category}
            onChange={handleEditFormDataChange}
          />
          <TextField
            fullWidth
            label="Indirect Method"
            name="method"
            value={editFormData.method}
            onChange={handleEditFormDataChange}
          />
          <TextField
            fullWidth
            label="Focused Population"
            name="focused"
            value={editFormData.focused}
            onChange={handleEditFormDataChange}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={editFormData.description}
            onChange={handleEditFormDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Program;
