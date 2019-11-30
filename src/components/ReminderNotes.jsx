import React, { Component } from 'react';
import NoteService from '../services/notesService'
import  DisplayNotes  from '../components/DisplayNotes'
import { CreateNote } from '../components/createNote'
const notesService = new NoteService()

export class GetReminderNotes extends Component {


    constructor(props) {
        super(props)

        this.state = {
            allNotes: [],
            open: false,
            NotesArray: [],

            slidecards: false,
            searchNote: '',
            listGridView: false,
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,

        }


    }
    componentWillMount() {

        this.getReminderNoteList();
    }

    simplifiedFunction = () => {
        console.log(" it in the get all notes");
        this.getReminderNoteList() 

    }

    getReminderNoteList() {
        notesService.getReminders().then((response) => {
            console.log(" respoinse", response);
            console.log(" response after getting all notes ", response);
            this.NotesArray = response['data'].data.data
            console.log(" data in array ", this.NotesArray);
            console.log("revered data noees data ", this.NotesArray.reverse());

            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
    }
    render() {
        console.log(" in the reminder slide card ", this.state.slidecards);

        const slide = this.state.slidecards ? "afterslide" : "beforeslide";


        return (


            <div className={slide}>
                <div><CreateNote getNewNote={this.getNewNote} /></div>
                <div>
                    <DisplayNotes allNotes={this.state} simplifiedFunction={this.simplifiedFunction}></DisplayNotes>
                </div>

            </div>



           

        )
    }
}