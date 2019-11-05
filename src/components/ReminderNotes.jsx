import React, { Component } from 'react';
import NoteService from '../services/notesService'
import { DisplayNotes } from '../components/DisplayNotes'
// import { DrawrMenuComponent } from '../components/DrawerMenu'
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

    getReminderNoteList() {
        notesService.getReminders().then((response) => {
            console.log(" respoinse", response);
            console.log(" response after getting all notes ", response);
            this.NotesArray = response['data'].data.data
            console.log(" data in array ", this.NotesArray);

            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
    }
    render() {
        console.log(" in the reminder slide card ", this.state.slidecards);

        const slide = this.state.slidecards ? "afterslide" : "beforeslide";


        return (


            <div className={slide}>
                <DisplayNotes allNotes={this.state.allNotes}></DisplayNotes>
            </div>



            // <DrawrMenuComponent getReminder={this.getReminderNoteList}/>

        )
    }
}