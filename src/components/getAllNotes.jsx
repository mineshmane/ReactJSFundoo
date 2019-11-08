import React, { Component } from 'react';
import NoteService from '../services/notesService'
import { DisplayNotes } from '../components/DisplayNotes'

const notesService = new NoteService()

export class GetAllNotes extends Component {
    constructor() {
        super()
        this.getUpdateNotes();
        this.state = {
            allNotes: [],
            open: false,
            NotesArray: [],
            notes: []

        }


    }


    componentWillMount() {

        this.getUpdateNotes();
    }

    simplifiedFunction = () => {
        console.log(" it in the get all notes");
        this.getUpdateNotes();

    }

    getUpdateNotes = async () => {


        await notesService.getAllNotes().then((response) => {

            console.log(" response after getting all notes ", response);
            this.notes = response['data'].data.data
            console.log(" data in array ", this.notes);


            this.NotesArray = this.notes.filter(function (key) {
                if (key.isDeleted === false && key.isArchived === false) {
                    return key
                }

            }

            );

            console.log("iem in data ", this.NotesArray);

            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
            // notesService.getAllNotes().then((allNotes) => {
            //     console.log(" data in notes ", this.allnotes);

            //     var allNotesArray = [];
            //     for (let i = allNotes.data.data.data.length - 1; i >= 0; i--) {
            //         allNotesArray.push(allNotes.data.data.data[i])
            //     }

            //     console.log("this data", this.allNotesArray);
            // })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <DisplayNotes allNotes={this.state.allNotes} simplifiedFunction={this.simplifiedFunction} ></DisplayNotes>

        )
    }

}