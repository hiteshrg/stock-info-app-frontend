import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'

export default function MenuAppBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [fullName, setFullName] = React.useState("");

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        setAnchorEl(null);
        if (value === 'logout') {
            localStorage.clear();
            navigate('/');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            const name = userData.fname + " " + userData.lname;
            setFullName(name)
        }
    }, [localStorage.getItem('userInfo')]);

    return (
        <Box sx={{ flexGrow: 1 }} id='appBar-container'>
            <AppBar position="sticky" sx={{ backgroundColor: "#4F38F7", color: "#fff", padding: '1rem 0' }}>
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <div>
                        <Typography variant="h6" className="appBar-profile-name text-capitalize">Hi, {fullName}</Typography>
                        <Typography variant="body2">Your Portfolio</Typography>
                    </div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                            <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
