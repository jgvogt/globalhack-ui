import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const Header = () => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Ambassador Connect
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
);

export default Header;
