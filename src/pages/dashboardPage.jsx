import React, { Component } from 'react';
import DashboardComponent from '../components/dashboard'
import CreateNote from '../components/createNote';
// import { GetAllNotes } from '../components/getAllNotes'
// import { withRouter } from 'react-router-dom'
// import { DisplayNotes } from '../components/DisplayNotes'

export default class UserDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            slidecards: false,
            searchNote: '',
            listGridView: false,
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,
        }


    }
    slidecard = () => {
        this.setState({
            slidecards: !this.state.slidecards
        })
    }




    render() {
        if (!localStorage.getItem('token') ) {
            return (

                <div>
                    {this.props.history.push('/login')}
                </div>
            )
        }
        else {
            console.log("user dashboar props", this.props.history.location.state);
            const key = this.props.history.location.state;
            const slide = this.state.slidecards ? "afterslide" : "beforeslide";
            const listView = this.state.listGridView ? "list-view-allNotes" : "allDemo"
            return (
                <div>
                    <div>
                        <DashboardComponent
                            slidecard={this.slidecard}
                            searchNote={this.searchNote}
                            listGridView={this.listGridView}
                            DashboardToPage={this.DashboardToPage}
                            props={this.props}
                            isNotes={true}

                        />

                    </div>
                    <div className={slide}>
                        {(key !== undefined) ?
                            <div>
                                {this.props.history.push('/usercart', key)}
                            </div>
                            :
                            <div className="create-note-margin">
                                {(!this.state.isTrash && !this.state.isArchive) &&
                                    <div>
                                        {/* <CreateNote getNewNote={this.getNewNote} /> */}
                                    </div>
                                }
                                <div className={listView}>
                                    {/* <GetAllNotes
                                        ref={this.noteToCards}
                                        searchNote={this.state.searchNote}
                                        listGridView={this.state.listGridView}
                                        isReminder={this.state.isReminder}
                                        isArchive={this.state.isArchive}
                                        isTrash={this.state.isTrash}
                                        isNotes={this.state.isNotes}
                                        props={this.props}
                                    /> */}

                                {/* <DisplayNotes  ref={this.noteToCards}
                                    searchNote={this.state.searchNote}
                                        listGridView={this.state.listGridView}
                                         isReminder={this.state.isReminder}
                                       isArchive={this.state.isArchive}
                                         isTrash={this.state.isTrash}
                                         isNotes={this.state.isNotes}
                                         props={this.props}/>  */}
                                </div>
                                {/* <div>
                                <GetAllLabels
                                GetAllLabelToDrawerMenu={this.GetAllLabelToDrawerMenu}
                                >

                                </GetAllLabels>
                            </div> */}
                            </div>
                        }
                    </div>
                </div>

            );
        }
    }
}