
import React, { Component } from "react";


import { Card, CardBody, CardLink, Container } from 'reactstrap';
// import {NoteService} from '../services/notesService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import Reminder from './Reminder'
// import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Dialog, Avatar, Button, IconButton, InputBase } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles';
// import MoreOptions from './MoreOptions';
// import CollaboratorComponent from './CollaboratorComponent';
import { IconsComponent } from './Icons'
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';





const mapStateToProps = (state) => {
    console.log("calling method", state);
    return {
        posts: state
    }
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
    cardWidth: {
        width: "100%"
    }
}
));

const thm = createMuiTheme({
    overrides: {
        MuiAvatar: {
            colorDefault: {
                border: "3px solid"
            }
        },
        MuiDialog: {
            paperWidthSm: {
                overflow: "visible",
                borderRadius: "10px",
            }
        }
    }
});
class DisplayNotes extends Component {

    constructor(props) {
        super(props);
        console.log("in display notes component ", this.props);

        this.state = {
            allNotes: [],
            open: false,
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
            view: false,
        }
        console.log("in display notes ", this.props.posts)

    }


    handleToggleOpen = (id, oldTitle, oldDescription) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            noteId: id,
            title: oldTitle,
            description: oldDescription
        }));
        console.log("id ......", id);
        console.log("note id ......", this.state.noteId);
        // this.props.props.history.push(`/dashboard/${id}`)
    }



    showCard() {
        console.log("in display notes component ", this.props.allNotes);

    }

    simplifiedFunction = () => {
        console.log(" display called ");
        this.props.simplifiedFunction()


    }



    render() {
        const masonryOptions = {
            // transitionDuration: 0.9
        };
        // console.log("in display notes upadted component ", this.props.allNotes);

        // console.log("in display notes ", this.props.posts.view)
        // console.log("in display notes ", this.props.posts.open)

        // let views = this.props.posts.map((post) => {
        //     return post.view
        // })
        // console.log(" viewas in map ",views[0]);
        // this.setState({view:!this.views})

        console.log(" redux props ", this.posts);

        var listgridvalue = this.props.posts.view;
        var slidecards = this.props.posts.open;
        const slide = slidecards ? "afterslide" : "beforeslide";

        const listgridview = listgridvalue ? "list-view" : "default-view";
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";
        const listView = listgridvalue ? null : "card-grid";
        const containerAllnotes = listgridvalue ? null : "container-allnotes"
        var notes = this.props.allNotes.allNotes.map((key) => {
            return (

                <div key={key.id} className={listgridview}>

                    <MuiThemeProvider theme={thm}>
                        <Container className="card-margin" >
                            <Card className="take-note-user-card-description"
                                onChange={() => this.handleColorChanger(key.color, key.id)}
                                style={{ backgroundColor: key.color }}>
                                <CardBody className="user-card-body-desc">
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "98%" }} className="wordBreakTitle">
                                            <InputBase

                                                id="outlined-dense-multiline"
                                                value={key.title}
                                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                                margin="dense"
                                                variant="outlined"
                                                readOnly
                                                multiline
                                                style={{ backgroundColor: key.color, width: "98%" }}
                                                placeholder="Title"
                                            />
                                        </div>
                                        {(key.isPined === true) ?
                                            <div style={{ height: "24px" }} >
                                                <Tooltip title="Unpin note">
                                                    <img src={require('../assets/images/pin.svg')}
                                                        alt="pin" className="is-pin"
                                                        onClick={() => this.handleUnpinNote(key.id)}
                                                    />

                                                    {/* <Pin/> */}
                                                </Tooltip>
                                            </div>
                                            : <div style={{ height: "24px" }}>
                                                <Tooltip title="Pin note">
                                                    <img src={require('../assets/images/unPin.svg')}
                                                        alt="pin" className="is-pin"
                                                        onClick={() => this.handlePinNote(key.id)}
                                                    />

                                                    {/* <Pin/> */}
                                                </Tooltip>
                                            </div>
                                        }
                                    </div>

                                    <div className="wordBreakDesc">
                                        <InputBase
                                            id="outlined-dense-multiline"
                                            value={key.description}
                                            onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                            margin="dense"
                                            variant="outlined"
                                            readOnly
                                            multiline

                                            style={{ backgroundColor: key.color,  }}
                                            placeholder="Description"
                                        />
                                    </div>
                                    {(key.reminder.length > 0) &&
                                        <div>
                                            <Chip
                                                label={key.reminder.toString().substring(0, 24)}
                                                onDelete={() => this.handleDeleteChip(key.id)}
                                                className={useStyles.chip}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    }

                                    {(key.noteLabels.length > 0) &&
                                        <div style={{ display: "flex", flexWrap: "wrap", width: "218px" }}>{
                                            key.noteLabels.map(labelskey => {
                                                return (
                                                    (labelskey.isDeleted === false) &&
                                                    <div key={labelskey.id}>
                                                        <Chip
                                                            label={labelskey.label}
                                                            onDelete={() => this.handleDeletelabel(key.id, labelskey.id, labelskey.label)}
                                                            className={useStyles.chip}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }

                                    {(key.collaborators.length > 0) &&
                                        <div style={{ display: "flex" }}>{
                                            key.collaborators.map(collaborator => {
                                                return (
                                                    <div className="collab" key={collaborator.userId}>
                                                        <Tooltip title={collaborator.email}>
                                                            <Avatar>
                                                                <span>{collaborator.firstName.toString().substring(0, 1).toUpperCase()}</span>
                                                            </Avatar>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </CardBody>

                                <CardBody >
                                    <div className={modalbottom}>




                                        <IconsComponent noteId={key} simplifiedFunction={this.simplifiedFunction}  ></IconsComponent>



                                    </div>
                                </CardBody>
                                {(key.questionAndAnswerNotes.length > 0) &&
                                    <Tooltip title="Reply">
                                        <div
                                            className="q-a-asked"
                                            style={{ borderTop: "1px solid gray", borderBottom: "none", cursor: "pointer" }}
                                            onClick={() => this.handleQuestionAnsAnswer(key.id)}
                                        >
                                            <div>
                                                <span><strong>Question Asked</strong></span>
                                            </div>
                                            <div className="innerHTML"
                                                dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message }}
                                                style={{ maxWidth: "200px" }}
                                            >
                                            </div>
                                        </div>
                                    </Tooltip>
                                }
                            </Card>
                        </Container>
                        <ToastContainer />
                        {(this.state.noteId === key.id) &&
                            <Dialog
                                key={key.id}
                                open={this.state.modal}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                className="dialog-bottom-icons"
                            >
                                <Card className="take-note-user-card-dialog"
                                    onChange={() => this.handleColorChanger(key.color, key.id)}
                                    style={{ backgroundColor: key.color }}
                                >
                                    <CardBody className="user-card-body-desc">
                                        <div>
                                            <InputBase
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                multiline
                                                style={{ backgroundColor: key.color }}
                                                placeholder="Title"
                                                className="dialog-input"
                                            />

                                            <InputBase
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Description"
                                                multiline
                                                style={{ backgroundColor: key.color }}
                                                className="dialog-input"
                                            />
                                        </div>
                                        {(key.reminder.length > 0) &&
                                            <div>
                                                <Chip
                                                    label={key.reminder.toString().substring(0, 24)}
                                                    onDelete={() => this.handleDeleteChip(key.id)}
                                                    className={useStyles.chip}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </div>
                                        }
                                        {(key.noteLabels.length > 0) &&
                                            <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>{
                                                key.noteLabels.map(labelskey => {
                                                    return (
                                                        (labelskey.isDeleted === false) &&
                                                        <div>
                                                            <Chip
                                                                label={labelskey.label}
                                                                onDelete={() => this.handleDeletelabel(key.id, labelskey.id, labelskey.label)}
                                                                className={useStyles.chip}
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        {(key.collaborators.length > 0) &&
                                            <div style={{ display: "flex" }}>{
                                                key.collaborators.map(collaborator => {
                                                    return (
                                                        <div className="collab" key={collaborator.userId}>
                                                            <Tooltip title={collaborator.email}>
                                                                <Avatar>
                                                                    <span>{collaborator.firstName.toString().substring(0, 1).toUpperCase()}</span>
                                                                </Avatar>
                                                            </Tooltip>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </CardBody>
                                    <div
                                        className="modal-footer-note"
                                    >

                                        <IconsComponent noteId={key} simplifiedFunction={this.simplifiedFunction}  ></IconsComponent>



                                        <CardLink ></CardLink>
                                        <Button
                                            className="close-btn"
                                            onClick={this.handleToggleClose}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                    {(key.questionAndAnswerNotes.length > 0) &&
                                        <Tooltip title="Reply">
                                            <div
                                                className="q-a-asked"
                                                style={{ borderTop: "1px solid gray", borderBottom: "none", cursor: "pointer" }}
                                                onClick={() => this.handleQuestionAnsAnswer(key.id)}
                                            >
                                                <div>
                                                    <span><strong>Question Asked</strong></span>
                                                </div>

                                                <div className="innerHTML"
                                                    dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message }}>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    }
                                </Card>
                            </Dialog>
                        }
                    </MuiThemeProvider>
                </div>

            )
        })

        return (
            <div className={containerAllnotes}>

                {/* <div className={listView}>
                    {notes}
                </div> */}
                <div className={slide}>
                    <Masonry options={masonryOptions}>
                        {notes}

                    </Masonry>
                </div>

                <Snackbar
                    // key={this.state.messageInfo}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={1000}
                    onClose={this.handleCloseSnackbar}
                    // onExited={this.handleExitedSnackbar}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.messageInfo}</span>}
                    action={[

                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps)(DisplayNotes);