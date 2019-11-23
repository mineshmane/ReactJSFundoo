import React, { Component } from 'react';
import NoteService from '../services/notesService'
import  DisplayNotes  from '../components/DisplayNotes'
// import { DrawrMenuComponent } from '../components/DrawerMenu'
const notesService = new NoteService()

export class GetTrashNotes extends Component {


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
            isTrashed: true,
            isArchive: false,
            isNotes: true,

        }


    }
    componentWillMount() {

        this.getTrashNoteList();
    }

    simplifiedFunction = () => {
        console.log(" it in the get all notes");
        this.getTrashNoteList();

    }


    getTrashNoteList() {
        console.log(" calling trash componnenet ");

        notesService.getTrashedNotes().then((response) => {
            console.log(" respoinse", response);
            console.log(" response after getting all notes ", response);
            this.NotesArray = response['data'].data.data
            console.log(" data in array ", this.NotesArray);

            console.log("revered data noees data ", this.NotesArray.reverse());
           
            

            // for (let i = this.NotesArray.length; i > 0; i--) {
            //     if ((this.NotesArray[i - 1]["isDeleted"] === false) && (this.NotesArray[i - 1]["isArchived"] === false)) {
            //       if (this.NotesArray[i - 1]["isPined"] === true) {
            //         this.pinedArray.push(this.NotesArray[i - 1]);
            //         this.pinedArray.reverse();
            //       }
            //       else {
            //         this.unpinedArray.push(this.NotesArray[i - 1]);
            //         this.unpinedArray.reverse();

            //       }
            //     }
            //   } 




            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
    }
    render() {
        console.log(" in the reminder slide card ", this.state.slidecards);

        const slide = this.state.slidecards ? "afterslide" : "beforeslide";


        return (


            <div className={slide}>
                <DisplayNotes  allNotes={this.state} simplifiedFunction={this.simplifiedFunction}></DisplayNotes>
            </div>



            // <DrawrMenuComponent getReminder={this.getReminderNoteList}/>

        )
    }
}