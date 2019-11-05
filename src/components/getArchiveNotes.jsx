import React, { Component } from 'react';
import { DisplayNotes } from '../components/DisplayNotes'
import NoteService from '../services/notesService'

const notesService = new NoteService()

export class GetArchivedNotes extends Component {


    constructor() {
        super()

        this.state = {
            allNotes: [],
            open: false,
            NotesArray: []

        }


    }

    componentWillMount() {

        this.getReminderNoteList();
    }


    getReminderNoteList() {
        notesService.getArchivedNotes().then((response) => {
            console.log(" respoinse", response);
            console.log(" response after getting all notes ", response);
            this.NotesArray = response['data'].data.data
            console.log(" data in array ", this.NotesArray);

            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
    }

    render() {

        return (<div>   <DisplayNotes allNotes={this.state.allNotes}></DisplayNotes></div>)
    }
}