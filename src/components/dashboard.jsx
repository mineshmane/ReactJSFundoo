import React, { Component } from 'react'
// import { Container, TextField, Typography, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import { Tooltip } from '@material-ui/core'
// import UserProfile from './UserProfile';
// import CreateNote from '../components/createNote';


const thm = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 65,
                width: 240,
                background: 'white'
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: 'black',
                backgroundColor: 'whitesmoke'
            },
            root: {
                left: 'auto',
            }
        },
    }
});






export default class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: false,
            listgrid: false,
            searchNote: '',
            allLabels: [],
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,
        }
    }

    handleToggle = () => {
        this.props.slidecard();
        this.setState({ open: !this.state.open });
    }





    render() {
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <AppBar position="fixed" >
                        <Toolbar className="toolBar" >
                            <Tooltip title="Main menu">
                                <IconButton color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleToggle} >
                                    <MenuIcon id="menu" />
                                </IconButton>
                            </Tooltip>
                            
                        </Toolbar>
                        <DrawerMenu
                            appBarProps={this.state.open}
                            DrawerMenuToDashboard={this.DrawerMenuToDashboard}
                            props={this.props.props}
                        />

                        {/* <div>
                            <CreateNote getNewNote={this.getNewNote} />
                        </div> */}

                    </AppBar>
                </MuiThemeProvider>
            </div>)

    }
}