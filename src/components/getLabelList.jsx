import React, { Component } from 'react'
// import LabelService from '../services/LabelServices';
import { MenuItem, Checkbox, FormControlLabel, InputBase, Tooltip } from '@material-ui/core';
import Check from '@material-ui/icons/Check'
import Edit from '@material-ui/icons/EditOutlined'
// import NoteService from '../services/NoteServices';
import NoteService from '../services/notesService'

const notesService = new NoteService()

// const LabelServices = new LabelService();
const NoteServices = new NoteService();
export class GetAllLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver: false,
            isChecked: [],
            NoteLabels: [],
            closeEdit: false,
            labelName: '',
            labelId: ''
        }
        this.handleLableChange = this.handleLableChange.bind(this);
        this.handleUserLabel = this.handleUserLabel.bind(this);
    }

    displayCard(newLabel) {
        console.log("display card==>", newLabel);

        this.setState({
            allLabels: [...this.state.allLabels, newLabel]
        })
    }

    async componentDidMount() {
        this.getAllLabels();

    }

    getAllLabels = () => {
        notesService.getLabels()
            .then(allLabels => {
                this.setState({ allLabels: allLabels.data.data.details })
                console.log("this data", this.state.allLabels);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getNotesLabelDetails = async () => {
        await NoteServices.getNotesLabelDetails(this.props.noteId)
            .then(response => {
                console.log("note labels==>", response.data);
                this.setState({
                    NoteLabels: response.data
                })
            })
    }

    compareNoteDetailsWithLabels = () => {
        // e.preventDefault();
        let labelDetails = [];
        labelDetails = this.state.allLabels.map(key => {
            return (
                key.label
            )
        })

        let noteLabels = []
        noteLabels = this.state.NoteLabels.map(noteLabels => { return noteLabels.label });

        console.log("note details array", labelDetails, "note labels array", noteLabels);
        var count = 0;
        for (let i = 0; i < labelDetails.length; i++) {
            for (let j = 0; j < noteLabels.length; j++) {
                console.log(labelDetails[i], noteLabels[j]);

                if (labelDetails[i] === noteLabels[j]) {
                    this.setState({
                        isChecked: [...this.state.isChecked, true]
                    })
                    break;
                }
                // else{
                //     break;
                // }
                else {
                    count++;
                    // this.countFalse(count);
                    if (count === noteLabels.length - 1) {
                        this.setState({
                            isChecked: [...this.state.isChecked, false]
                        })
                    }
                }
            }
        }
        console.log("this.ischeched", this.state.isChecked);
    }

    countFalse = (count) => {
        if (count > 1) {
            this.setState({
                isChecked: [...this.state.isChecked, false]
            })
        }
    }

    handleMounseEvent = (labelId) => {
        this.setState({
            mouseOver: !this.state.mouseOver,
            labelId: labelId,
        })
    }

    handleDeleteLabel = (labelId) => {
        this.setState({
            labelId: labelId
        })

        var labelData = {
            'id': labelId,
        }

        notesService.deleteNoteLabel(labelData.id)
            .then(() => {
                notesService.getLabels()
                    .then(allLabels => {
                        this.setState({ allLabels: allLabels.data.data.details })
                        console.log("this data", this.state.allLabels);
                        this.setState({
                            allLabel: [...this.state.allLabel, this.props.newLabel]
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }



    handleUserLabel(labelName) {
        this.props.props.history.push(`/usernote/${labelName}`, labelName)
    }

    handleLableChange(e, labelId) {
        let isChecked = e.target.checked;
        let checkedValue = e.target.value
        // do whatever you want with isChecked value
        console.log("checkbox value", isChecked, labelId, this.props.noteId);


        if (isChecked) {
            var addData = {
                'noteId': this.props.noteId,
                'labelId': labelId,
                data: {
                    'noteIdList': this.props.noteId,
                    'label': checkedValue
                }
            }
            NoteServices.addLabelToNotes(addData)
                .then(() => {
                    this.props.getAllLabelsToCreateLabels(true);
                })
                .catch((err) => {
                    console.log("error in addlabeltonote", err);
                })
        }
        if (!isChecked) {
            var removeData = {
                'noteId': this.props.noteId,
                'labelId': labelId
            }
            NoteServices.removeLabelToNotes(removeData)
                .then(() => {
                    this.props.getAllLabelsToCreateLabels(true);
                })
                .catch((err) => {
                    console.log("error in addlabeltonote", err);
                })
        }
    }

    // mapChecked =  () =>{
    //     var value= []
    //     for (let i = 0; i < this.state.allLabels.length; i++) {
    //         value = this.state.isChecked.map(isChecked => {return isChecked})
    //         console.log("value",value);

    //         if( i > 0){
    //             return value.splice(i,1)
    //         } else{
    //             return value 
    //         }
    //     }


    // }
    handleCloseEdit = (labelId, labelName) => {
        this.setState({
            closeEdit: true,
            labelId: labelId,
            labelName: labelName,
            mouseOver: true
        })
    }

    handleChangeUpdateLabel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUpdateLabel = (labelId, labelName) => {
        var data = {
            'id': labelId,
            data: {
                "label": labelName,
                "isDeleted": false,
            }
        }

        notesService.updateLabel(data)
            .then(res => {
                console.log(res);
                //   this.props.getAllLabelsToCreateLabels(true);
            })
    }

    render() {
        // console.log("map",this.mapChecked());

        // console.log(this.state.isChecked.length);
        // console.log("getall labels render() ", this.props.noteId);
        // console.log("this.ischeched", this.state.isChecked);
        const labels = this.state.allLabels.map((key) => {
            return (
                this.props.sidebarLabel ?
                    <MenuItem key={key.id} onClick={() => this.handleUserLabel(key.label)} style={{ borderRadius: "0 25px 25px 0" }}>
                        <img className="update-card-img cursor-pointer"
                            src={require('../assets/images/label.svg')}
                            alt="label"
                        />
                        <span className="fundoo-text-sidebar">{key.label}</span>
                    </MenuItem>
                    :
                    this.props.editLabels ?
                        <div className="edit-label-dialog" key={key.id}>
                            {!this.state.mouseOver ?
                                <div className="edit_label_gray ">
                                    <img className="update-card-img cursor-pointer"
                                        src={require('../assets/images/edit_label_gray.png')}
                                        alt="label"
                                        onMouseOver={() => this.handleMounseEvent(key.id)}
                                    />
                                </div>
                                :
                                (this.state.labelId === key.id) ?
                                    <Tooltip title="Delete label">
                                        <div className="delete_label_gray" key={key.id}>
                                            <img className="update-card-img cursor-pointer"
                                                src={require('../assets/images/delete_grey.png')}
                                                alt="label"
                                                onMouseLeave={this.handleMounseEvent}
                                                onClick={() => this.handleDeleteLabel(key.id)}
                                            />
                                        </div>
                                    </Tooltip>
                                    :
                                    <div className="edit_label_gray">
                                        <img className="update-card-img cursor-pointer"
                                            src={require('../assets/images/edit_label_gray.png')}
                                            alt="label"
                                            onMouseOver={() => this.handleMounseEvent(key.id)}
                                        />
                                    </div>
                            }

                            <div>
                                {(this.state.editLabel) ?
                                    <div style={{ display: "flex" }}>
                                        <InputBase
                                            placeholder="create new label"
                                            name="label"
                                            value={key.label}
                                            onClick={() => this.handleCloseEdit(key.id, key.label)}
                                            readOnly
                                        />
                                        <Tooltip title="Rename label">
                                            <Edit
                                                onClick={() => this.handleCloseEdit(key.id, key.label)}
                                                className="cursor-pointer"
                                            />
                                        </Tooltip>
                                    </div>
                                    :
                                    (this.state.labelId === key.id) ?
                                        <div style={{ display: "flex" }}>
                                            <InputBase
                                                placeholder="create new label"
                                                name="label"
                                                value={this.state.editLabel}
                                                onChange={this.handleChangeUpdateLabel}
                                                autoFocus
                                                style={{ borderBottom: "1px solid lightgray" }}
                                            />
                                            <Tooltip title="Rename label">
                                                <Check
                                                    onClick={() => this.handleUpdateLabel(key.id, key.label)}
                                                    className="cursor-pointer"

                                                />
                                            </Tooltip>
                                        </div>
                                        :
                                        <div style={{ display: "flex" }}>
                                            <InputBase
                                                placeholder="create new label"
                                                name="label"
                                                value={key.label}
                                                onClick={() => this.handleCloseEdit(key.id)}
                                                readOnly
                                            />
                                            <Tooltip title="Rename label">
                                                <Edit
                                                    onClick={() => this.handleCloseEdit(key.id)}
                                                    className="cursor-pointer"
                                                />
                                            </Tooltip>
                                        </div>
                                }
                            </div>
                        </div>
                        :
                        this.props.createLabelNoteCreate &&
                        <div key={key.id} style={{ marginLeft: "5%" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => this.handleLableChange(e, key.id)}
                                        value={key.label}
                                        color="primary"
                                        style={{ padding: "0" }}
                                        size="small"
                                    // {this.state.isChecked.map(checked => {}) }
                                    // checked={}
                                    />
                                }
                                label={key.label}
                            />
                        </div>
                // )
                //     }
                // })

            )
        })
        return (
            <div>
                {labels}
            </div>
        )
    }
}
