import React, { useState } from 'react';
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // State to manage updated data with access level changes
  const [updatedData, setUpdatedData] = useState(mockDataTeam);
  const [editRowId, setEditRowId] = useState(null); // State to track which row is being edited

  // Function to handle access level change
  const handleAccessLevelChange = (id, newAccessLevel) => {
    const updatedTeam = updatedData.map(member => {
      if (member.id === id) {
        return { ...member, accessLevel: newAccessLevel };
      }
      return member;
    });
    setUpdatedData(updatedTeam);
    setEditRowId(null); // Reset edit state after saving
  };

  // Click handler to initiate editing
  const handleAccessLevelClick = (id) => {
    setEditRowId(id);
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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => (
        editRowId === row.id ? (
          <Select
            value={row.accessLevel}
            onChange={(e) => handleAccessLevelChange(row.id, e.target.value)}
            fullWidth
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        ) : (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.accessLevel === "admin"
                ? colors.greenAccent[600]
                : row.accessLevel === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            onClick={() => handleAccessLevelClick(row.id)}
            style={{ cursor: "pointer" }} // Add cursor pointer for interaction
          >
            {row.accessLevel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {row.accessLevel === "manager" && <SecurityOutlinedIcon />}
            {row.accessLevel === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.accessLevel}
            </Typography>
          </Box>
        )
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={updatedData} 
          columns={columns} 
          rowHeight={45} // Adjust row height as needed
        />
      </Box>
    </Box>
  );
};

export default Team;
