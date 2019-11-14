import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
// import { GetReminderNotes } from './ReminderNotes';
import { GetAllLabels } from './getLabelList'
import NoteService from '../services/notesService'
// import {CreateLabel} from '../components/LabelDialog'
import { CreateLabel } from './createLabel'
const notesService = new NoteService()

class DrawerMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            status: false,
            allLabels: [],
            trash: false
        }


    }




    getAllLabels = async () => {
        await notesService.getLabels()
            .then(allLabels => {
                this.setState({ allLabels: allLabels.data.data.details })
                console.log("this data", this.state.allLabels);
            })
            .catch(err => {
                console.log(err);
            })
    }


    // handleClickOpen(){
    //     this.setState({
    //         openDialog: !this.openDialog,
    //     })

    // }
    handleReminder = () => {
        // this.props.DrawerMenuToDashboard(true, false, false, false);
        this.props.props.history.push('/dashboard/reminder');
        //    / this.props.getReminder()
    }
    handleNotes = () => {
        this.props.props.history.push('/dashboard/notes')
    }


    handleArchived = () => {
        // this.props.DrawerMenuToDashboard(false, false, true, false);
        this.props.props.history.push('/dashboard/Archive');
    }
    handleTrashed = () => {
        this.props.props.history.push('/dashboard/TrashNotes')
    }

    simplifiedFunction = (labelName) => {
        console.log(" it in the get all notes");
        this.props.props.history.push('/dashboard/getNotesByLabel/' + labelName)
    }

    render() {

        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={200}
                >
                    <MenuItem onClick={this.handleNotes}
                        style={{ borderRadius: "0 25px 25px 0", backgroundColor: (this.state.trash) ? "#feefc3" : null }}>
                        <img className="update-card-img"
                            src={require('../assets/images/notes.svg')}
                            alt="color picker" />
                        <span className="fundoo-text-sidebar">Notes</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleReminder} className="MuiMenuItem-gutters"
                        style={{ borderRadius: "0 25px 25px 0", backgroundColor: (this.state.trash) ? "#feefc3" : null }}>
                        <img className="update-card-img"
                            src={require('../assets/images/reminder.svg')}
                            alt="reminder" />
                        <span className="fundoo-text-sidebar">Reminders
                        </span>
                    </MenuItem>
                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "12px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            {/* <Label className="fundoo-text-sidebar">Labels</Label> */}
                        </div>
                        <div>
                            <GetAllLabels
                                sidebarLabel={true}
                                props={this.props.props}
                                simplifiedFunction={this.simplifiedFunction}
                            />
                            {/* <MenuItem
                                onClick={this.handleLabelOpen}
                                className="drawer-links"
                            >
                                <div onClick={this.handleClickOpen} className="cursor-pointer">
                                    <img className="update-card-img"
                                        src={require('../assets/images/edit_label.svg')}
                                        alt="color picker" />
                                    <span className="fundoo-text-sidebar">Edit Labels</span>
                                </div>


                                <CreateLabel
                            dialogValue = {this.state.openDialog}
                            />
                            </MenuItem> */}


                            <MenuItem
                                onClick={this.handleLabelOpen}
                                className="drawer-links"
                            >
                                <CreateLabel
                                    sidebarLabel={this.state.open}
                                />
                            </MenuItem>
                        </div>
                    </div>

                    <MenuItem onClick={this.handleArchived}
                        className="MuiMenuItem-gutters"
                        style={{ borderRadius: "0 25px 25px 0", backgroundColor: (this.state.trash) ? "#feefc3" : null }}>
                        <img className="update-card-img"
                            src={require('../assets/images/archived.svg')}
                            alt="color picker" />
                        <span className="fundoo-text-sidebar">Archive</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleTrashed}
                        className="MuiMenuItem-gutters"
                        style={{ borderRadius: "0 25px 25px 0", backgroundColor: (this.state.trash) ? "#feefc3" : null }}>
                        <img className="update-card-img"
                            src={require('../assets/images/trash.svg')}
                            alt="color picker" />
                        <span className="fundoo-text-sidebar">Trash</span>
                    </MenuItem>

                </Drawer>
            </div>
        )
    }
}

export default (DrawerMenu)