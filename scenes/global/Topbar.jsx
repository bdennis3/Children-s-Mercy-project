import React, { useContext, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../../theme";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear authentication state)
        // For example, clearing localStorage token:
        localStorage.removeItem('token');

        // Redirect to a different destination after logout
        window.location.href = 'http://localhost:3002';
    };

    return (
    <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box 
          display="flex" 
          backgroundColor={colors.primary[400]} 
          borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"/>
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
        
        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton
                onClick={handleClick}
                aria-haspopup="true"
                aria-controls="profile-menu"
                aria-label="account of current user"
                color="inherit"
            >
                <PersonOutlinedIcon />
            </IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                {/* Add more menu items as needed */}
            </Menu>
        </Box>
    </Box>
   );
};

export default Topbar;
