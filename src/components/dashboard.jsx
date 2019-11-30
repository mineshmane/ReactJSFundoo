import React, { Component } from 'react'
// import { Container, TextField, Typography, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import DrawerMenu from './DrawerMenu';
import { Tooltip } from '@material-ui/core'



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





class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // view: false,
            listgrid: false,
            searchNote: '',
            allLabels: [],
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,
            view2:false

        }
    }

    handleToggle = () => {
        this.props.slidecard();
        this.setState({ open: !this.state.open });

        console.log(" css changesd",this.props.state.open);
        
        const data1 = {
            open: !this.props.state.open
            // view2:this.state.view

        }
        // this.setState( {view: true})
        // console.log(" this state ",this.setState);
        
        console.log(" data ", data1);

        this.props.dispatch({ type: 'slideCard' });

    }


    handleToggleView = (e) => {
        console.log(" css changesd",this.props.state.view);
        
        const data1 = {
            view: !this.props.state.view
            // view2:this.state.view

        }
        // this.setState( {view: true})
        // console.log(" this state ",this.setState);
        
        console.log(" data ", data1);

        this.props.dispatch({ type: 'listView' });



        // this.setState({ view: !this.state.view });
        // this.props.listGridView(this.state.view)
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


                            <div style={{ width: "10%" }}>
                                {this.props.isNotes === true ?
                                    <div className="note-text-img">
                                        <img className="fundoo-note-img"
                                            src={require('../assets/images/keep_48dp.png')}
                                            alt="keep icon"
                                        />
                                        <div style={{ margin: "5%" }}>
                                            <span className="fundoo-text">Fundoo</span>
                                        </div>
                                    </div>

                                    :
                                    null
                                        ||
                                        this.props.isReminder === true ?
                                        <span className="fundoo-text">Reminders</span>
                                        :
                                        null
                                            ||
                                            this.props.isArchive === true ?
                                            <span className="fundoo-text">Archive</span>
                                            :
                                            null
                                                ||
                                                this.props.isTrash === true ?
                                                <span className="fundoo-text">Trash</span>
                                                :
                                                null
                                }
                            </div>


                            <div className="view-search-input">
                                {/* <div className="input-group input-search">
                                    <div className="input-group-prepend">
                                        <button className="btn fa fa-search search-button" outline="true" color="white" />
                                    </div>
                                    <input
                                        type="text"
                                        className=" input"
                                        placeholder="Search...."
                                        value={this.state.searchValue}
                                        onChange={this.handleChange} />
                                </div> */}
                                <div style={{ display: "flex", paddingLeft: '10vh' }}>
                                    <div>
                                        {!this.props.QnAEditor ?

                                            !this.state.view ?
                                                <Tooltip title="List view">
                                                    <div onClick={this.handleToggleView}
                                                        className="list-view-div">
                                                        <img className="img"
                                                            src={require('../assets/images/list_view.svg')}
                                                            alt="list icon"
                                                        />
                                                    </div>
                                                </Tooltip> :
                                                <Tooltip title="Grid view">
                                                    <div onClick={this.handleToggleView}
                                                        className="list-view-div">
                                                        <img className="img"
                                                            src={require('../assets/images/grid_view.svg')}
                                                            alt="list icon"
                                                        />
                                                    </div>
                                                </Tooltip>
                                            :
                                            null
                                        }
                                    </div>
                                    <div onClick={this.handleCart} style={{ cursor: "pointer" }}>
                                        <Tooltip title="Cart">
                                            <div onClick={this.handleToggleCart}>
                                                <img style={{ padding: "1.5vh", justifyItems: 'center' }}
                                                    src={require('../assets/images/cart.svg')}
                                                    alt="cart"
                                                />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                        </Toolbar>
                        <DrawerMenu
                            appBarProps={this.state.open}
                            DrawerMenuToDashboard={this.DrawerMenuToDashboard}
                            props={this.props.props}
                        />

                       

                    </AppBar>
                </MuiThemeProvider>
            </div>)

    }
}
const mapSateToProps =(state)=>{
    return {
        state : state
    }
}
 export default connect(mapSateToProps)(DashboardComponent);