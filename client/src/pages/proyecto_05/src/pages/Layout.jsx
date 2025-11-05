import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Layout.css';

function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { text: 'HOME', path: '/' },
        { text: 'GAMES', path: '/games' },
        { text: 'ATRAPA ESTRELLAS', path: '/gameStar' },
        { text: 'ABOUT US', path: '/aboutUs' }
    ];

    const handleNavigate = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static" className="layout-appbar">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" className="layout-title">
                        GRUPO 8
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0 }}>
                        {menuItems.map((item) => (
                            <Button 
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                className="layout-menu-button"
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    <IconButton
                        color="inherit"
                        className="layout-hamburger"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{ className: 'layout-drawer' }}
                    >
                        <List sx={{ width: 250 }}>
                            {menuItems.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton 
                                        onClick={() => handleNavigate(item.path)}
                                        className="layout-drawer-item"
                                    >
                                        <ListItemText 
                                            primary={item.text}
                                            className="layout-drawer-text"
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
            
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;