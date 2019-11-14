import React, { Component } from 'react';

import { CreateNote } from '../components/createNote'
import { Router, browserHistory } from 'react-router'; // notice I'm importing from 'react-router'


import NoteService from '../services/notesService'
import { DisplayNotes } from '../components/DisplayNotes'
// import { DrawrMenuComponent } from '../components/DrawerMenu'
const notesService = new NoteService()

export class NotesByLabel extends Component {


    label;
    constructor(props) {
        super(props)
        console.log(" inside the getnots");

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

        console.log(this.props);

        this.label = this.props.match.params.labelName
        console.log("hfhdf", this.label)
        // this.getNoteListByLabel=this.getNoteListByLabel().bind(this);


    }

    // browserHistory.listen((ev) =>{
    //     console.log('listen', ev.pathname);
    //   });
   

    componentDidUpdate(prevProps) {
        console.log(" calling lifecy ",prevProps);
        
        if (prevProps.match.params.labelName !== this.props.match.params.labelName) {
        
            console.log(" calling inside if");
            
        this.getNoteListByLabel();

         
        }
      }
   
    componentWillMount() {

        //     history.listen((location, action) => {
        //         console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        //     console.log(`The last navigation action was ${action}`)
        //   })

        this.getNoteListByLabel();
    }
    // componentDidMount() {
    //     const { myKey } = this.props.match.params.labelName
    //     console.log("hfhdf", myKey)
    // }

    async getNoteListByLabel() {
        console.log(" method calling");
// this.setState.allNotes=null
        // const label = this.props.match.params.labelName
        // console.log("hfhdf", label)

     await   notesService.getNoteByLabel(this.label).then((response) => {
            console.log(" respoinse", response);
        
            this.NotesArray = response['data'].data.data
     
            console.log("revered data noees data ", this.NotesArray.reverse());

            this.setState({ allNotes: this.NotesArray })

            console.log("this data", this.state.allNotes);

        })
    }

    render() {
      
        const slide = this.state.slidecards ? "afterslide" : "beforeslide";
        this.label = this.props.match.params.labelName
        

        return (<div>

            <div className={slide}>
                inside label

                <div><CreateNote getNewNote={this.getNewNote} /></div>

                <div> <DisplayNotes allNotes={this.state}></DisplayNotes></div>

            </div>


        </div>)
    }
}