import React, { Component } from 'react';
// import Tooltip from '@material-ui/core/Tooltip';
import { Tooltip, Card } from '@material-ui/core';
import { CreateLabel } from './createLabel'
import NoteService from '../services/notesService'
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

// import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


import popMenu from './menus'
import { IconButton, ClickAwayListener, Paper } from '@material-ui/core';



const hexCodesAndNames =
    [{ name: "lightcoral", hexCode: "#f28b81" },
    { name: "lavender", hexCode: "#e8eaed" },
    { name: "orange", hexCode: "#f7bc02" },
    { name: "green", hexCode: "#ccff8f" },
    { name: "yellow", hexCode: "#fcf475" },
    { name: "paleturquoise", hexCode: "#a7ffeb" },
    { name: "lightcyan", hexCode: "#cbf0f8" },
    { name: "lightblue", hexCode: "#aecbfa" },
    { name: "plum", hexCode: "#d7aefb" },
    { name: "wheat", hexCode: "#e6c9a8" },
    { name: "mistyrose", hexCode: "#fbcfe8" },
    { name: "white", hexCode: "#ffffff" }
    ]

const notesService = new NoteService()
export class IconsComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            allNotes: [],
            open: false,
            openColor: false,
            title: '',
            description: '',
            noteId: '',
            modal: false,
            isArchived: false,
            isTrash: false,
            // isReminder: false,
            isNotes: false,
            tooltipOpen: false,
            color: '',
            reminder: '',
            openSnackbar: false,
            messageInfo: '',
            collaborator: [],
            open: false,
            isDeleted: false,
            addLabel: false,
            label: '',
          

        }
        // console.log("Color Component 37: ", this.props.props.noteID)
        console.log("in icons  component  $%$%%$%%$$$%%$%$%", this.props.isTrashed);

    }

    closePopper() {
        this.setState({
            open: false,
            addLabel: false
        })
    }

    handleAddLabel() {
        console.log(" add label called");
        
        this.setState({ addLabel: !this.state.addLabel });
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            addLabel: false
        });
        console.log(this.state.open);

        //this.props.handleToggle(!this.state.open)
    }


    handleColorToggle = () => {
        this.setState({ openColor: !this.state.openColor });
        //this.props.handleToggle(!this.state.open)
    }
    handleArchiveNote = () => {
        var noteDta = {
            'noteIdList': [this.props.noteId.id],
            // 'isDeleted': false,
            'isArchived': true
        }
        console.log(" note in archiuve ", noteDta);

        notesService.archiveNoteservice(noteDta).then(response => {
            console.log(response);
            this.props.simplifiedFunction()

        }).catch(err => {
            console.log(err);

        })

    }


    handleDeleteNote = (noteId) => {
        console.log("Color Component 37: ", this.props.noteId.id)

        var note = {
            'noteIdList': [this.props.noteId.id],
            'isDeleted': true
        }
        notesService.trashNote(note)
            .then(response => {
                console.log(response);
                let newArray = this.state.allNotes
                console.log("new array", newArray);
                // this.getUpdateNotes();
                this.props.simplifiedFunction()

            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    unTrashNote = () => {
        var note = {
            'noteIdList': [this.props.noteId.id],
            'isDeleted': false
        }
        notesService.trashNote(note)
            .then(response => {
                console.log(response);
                let newArray = this.state.allNotes
                console.log("new array", newArray);
                // this.getUpdateNotes();
                this.props.simplifiedFunction()

            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleDeleteForeverNote = (noteId) => {
        console.log("Color Component 37: ", this.props.noteId.id)

        var note = {
            'noteIdList': [this.props.noteId.id],
            'isDeleted': true
        }
        notesService.deleteForeverNotes(note)
            .then(response => {
                console.log(response);
                let newArray = this.state.allNotes
                console.log("new array", newArray);
                // this.getUpdateNotes();
                this.props.simplifiedFunction()

            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }



    handleColorChanger = (event) => {
        console.log(" values ", event.target.value);

        console.log("Color Component 37: ", this.props.noteId.id)
        var noteId = this.props.noteId.id;
        console.log(" noteid in color ", noteId);

        this.setState({ color: event })
        var note = {
            'noteIdList': [noteId],
            'color': event.target.value,
        }
        console.log(" note ", note);


        notesService.changesColorNotes(note)
            .then(response => {
                console.log(response);
                this.props.simplifiedFunction()

                // this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }


    openReminder(){


        this.setState({
            open: !this.state.open,
            addLabel: false
        });
        console.log(this.state.open);
    }





    render() {
        var listgridvalue = this.props.listGridView;

        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";

        const changeCardColor = hexCodesAndNames.map((colorKey) =>

            <Tooltip title={colorKey.name} key={colorKey.hexCode}>
                <IconButton style={{ backgroundColor: colorKey.hexCode, "margin": "2px", }}
                    value={colorKey.hexCode}
                    onClick={this.handleColorChanger}
                    onMouseOver={this.handleColorToggle}

                // onMouseOver={this.handleToggle}
                onMouseLeave={this.handleColorToggle}

                >
                </IconButton>
            </Tooltip>
        );
        // console.log("Color Component 37: ", this.props.noteId)


        return (


            <div className={modalbottom}>
                <Tooltip title="Remind me">
                    <img src={require('../assets/images/alert.svg')}
                        className="img"
                        alt="remind me"
                        onClick={this.openReminder}
                    />
                </Tooltip>



                {/* <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}> */}
               <Tooltip title="Collaborator">
                     <img
                        src={require('../assets/images/colaborator.svg')}
                        alt="Collaborator"
                    />
                       {/* <popMenu ></popMenu> */}
                   
                </Tooltip> 
             
               
                {/* </div> */}
                <Tooltip title="Change Color">
                    <img src={require('../assets/images/color.svg')}
                        className="img"
                        alt="change color"
                        onMouseOver={this.handleColorToggle}
                        // onClick={this.handleToggle}
                    // onMouseLeave={this.handleColorToggle}
                    />
                </Tooltip>

                <Paper>
                    {this.state.openColor ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="colorPalleteCard">
                                {changeCardColor}
                            </Card>
                        </ClickAwayListener>

                        : null}
                </Paper>



                <Tooltip title="Add image">
                    <img className="img"
                        src={require('../assets/images/add_image.svg')}
                        alt="color picker"
                        htmlFor="contained-button-file"
                    />
                </Tooltip>
                <Tooltip title="Archive">
                    <img className="img" onClick={this.handleArchiveNote}
                        src={require('../assets/images/archived.svg')}
                        alt="color picker"
                    />
                </Tooltip>
                {/* <Tooltip title="More">
                    <img src={require('../assets/images/more_options.svg')}
                        className="img"
                        alt="remind me"
                        onClick={this.handleToggle}
                    />
                </Tooltip> */}

<PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <React.Fragment>
                            {/* <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                Open Menu
              </Button> */}

              <img src={require('../assets/images/more_options.svg')}
                        className="img"
                        alt="remind me"
                        {...bindTrigger(popupState)}
                    />
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>Cake</MenuItem>
                                <MenuItem onClick={popupState.close}></MenuItem>

                                <MenuItem onClick={popupState.close}>addLabel</MenuItem>

                                <MenuItem onClick={popupState.close}>delete Note</MenuItem>
                                <MenuItem onClick={popupState.close}>add cheklist</MenuItem>


                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>



                <div >
                    {this.state.open ?
                        // <ClickAwayListener onClickAway={() => this.closePopper()}>
                        <Card className="more-options">
                            {
                                this.state.addLabel ?
                                    <CreateLabel
                                        addLabelToMoreOptions={this.addLabelToMoreOptions}
                                        addLabelOpen={this.state.addLabel}
                                        style={{ width: "100%" }}
                                        noteID={this.props.noteID}
                                        createLabelToMoreOptions={this.createLabelToMoreOptions}
                                        createLabelToMoreOptionForCreateNote={this.createLabelToMoreOptionForCreateNote}
                                        createNoteLabel={this.props.createNoteLabel}
                                    />
                                    :
                                    <div style={{ width: "115px" }}>
                                        {
                                            this.props.noteID === '' ?
                                                null
                                                :
                                                this.props.isTrashed === true ?
                                                    <div className="remind-day" onClick={this.handleDeleteNote}>
                                                      
                                                    </div>
                                                    :
                                                    <div >
                                                        <div className="remind-day" onClick={this.handleDeleteNote}>
                                                            Delete Note
                                                            </div>
                                                        <div className="remind-day" onClick={this.handleDeleteForeverNote}>
                                                            delete forever
                                                    </div>
                                                        <div className="remind-day" onClick={this.unTrashNote}>
                                                            Restore
                                                </div>
                                                    </div>



                                        }
                                        {this.props.isTrashed === true ?
                                            <div className="remind-day" onClick={this.unTrashNote}>
                                                <div>
                                                    Restore
                                                </div>
                                            </div>
                                            :
                                            <div className="remind-day" onClick={this.handleAddLabel}>
                                                <div>
                                                    Add label
                                       </div>
                                            </div>
                                        }{
                                            this.props.isTrashed === true ?
                                                null
                                                :
                                                <div>
                                                    <div className="remind-day" onClick={this.handleAskQuestion}>
                                                        <div>
                                                            Ask Question
                                                            </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }
                        </Card>
                        : null
                    }
                </div>



            </div>
        )
    }
}