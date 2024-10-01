import React, { useState } from 'react';
import { Container, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UploadDataPage from '../pages/UploadDataPage';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation

const MainLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate(); // For programmatic navigation

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const navigateTo = (path) => {
        navigate(path); // Navigate to the specified path
        setDrawerOpen(false); // Close the drawer after navigation
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Hamburger Icon */}
            {!drawerOpen && (
                <IconButton
                    onClick={toggleDrawer(true)}
                    sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Side Drawer */}
            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ width: '50%', flexShrink: 0 }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button onClick={handleDialogOpen} sx={{ userSelect: 'none' }}>
                            <ListItemText primary="Upload New Data" />
                        </ListItem>
                        <ListItem button onClick={() => navigateTo('/database')} sx={{ userSelect: 'none' }}>
                            <ListItemText primary="Database" />
                        </ListItem>
                        <ListItem button sx={{ userSelect: 'none' }}>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    ml: drawerOpen ? '250px' : 0,
                    transition: 'margin 0.3s',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'relative'
                }}
            >
                <Container maxWidth="md" sx={{ flexGrow: 1 }}>
                    <Outlet /> {/* Render the route components here */}
                </Container>
            </Box>

            {/* Upload Data Dialog */}
            <UploadDataPage open={dialogOpen} onClose={handleDialogClose} />
        </Box>
    );
};

export default MainLayout;
