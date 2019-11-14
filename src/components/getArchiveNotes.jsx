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
            NotesArray: [],
            notes:[]

        }


    }

    componentWillMount() {

        this.getReminderNoteList();
    }

    simplifiedFunction = () => {
        console.log(" it in the get all notes");
        this.getReminderNoteList();

    }



    getReminderNoteList() {
        notesService.getArchivedNotes().then((response) => {
            // console.log(" respoinse", response);
            // console.log(" response after getting all notes ", response);
            this.notes = response['data'].data.data
            // console.log(" data in array ", this.NotesArray);
            // console.log("revered data noees data ", this.NotesArray.reverse());


            this.NotesArray = this.notes.filter(function (key) {
                if (key.isDeleted === false && key.isArchived === true) {
                    return key
                }

            }

            );

            console.log("revered data noees data ", this.NotesArray.reverse());

            this.setState({ allNotes: this.NotesArray })

            // this.setState({ allNotes: this.NotesArray })

            // console.log("this data", this.state.allNotes);

        })
    }

    render() {

        return (<div>   <DisplayNotes allNotes={this.state}  simplifiedFunction={this.simplifiedFunction}></DisplayNotes></div>)
    }
}