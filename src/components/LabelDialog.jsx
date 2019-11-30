import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { GetAllLabels } from './getLabelList'
import NoteServices from '../services/notesService';




export class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            openDialog: false,
            closeEdit: false,
            newLabel: [],
            labelId: '',

        }
        console.log(" this.props in dialog ", this.props);

    }


    render() {
        console.log(" props in render ()",this.props.dialogValue);
       if(this.props.dialogValue){

       }
        
        return (

            <div>
                {/* !this.props.openDialog ?  */}
                <div>
                    <Dialog

                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title">


                        <GetAllLabels
                            sidebarLabel={true}
                            props={this.props.props}
                            simplifiedFunction={this.simplifiedFunction}
                        />

                    </Dialog>


                </div>


            </div>
        )
    }
}