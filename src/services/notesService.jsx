import axios from 'axios';
// import { toast } from 'react-toastify';

const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api/notes";
const labelurl = 'http://fundoonotes.incubation.bridgelabz.com/api/noteLabels'
const token = localStorage.getItem("token")
console.log(localStorage.getItem("token"));

export default class NoteService {

    createNoteService(data) {
        return axios.post(`${BaseURL}/addNotes`, data, {
            headers: {
                'Authorization': token
            }
        })
    }

    addNotes(data) {
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/addNotes`, data, {
            headers: {
                'Authorization': token
            }
        })

    }

    getAllNotes() {
        const token = localStorage.getItem("token")

        return axios.get(`${BaseURL}/getNotesList`, {
            headers: {
                'Authorization': token
            }
        })
    }
    getReminders() {
        return axios.get(`${BaseURL}/getReminderNotesList`, {
            headers: {
                'Authorization': token
            }
        })
    }


    getNoteByLabel(label) {
        console.log(" label in service ", label);

        return axios.post(`${BaseURL}/getNotesListByLabel/` + label ,{}, {
            headers: {
                'Authorization': token
            }
        })

    }

    archiveNoteservice(data) {
        return axios.post(`${BaseURL}/archiveNotes`, data, {
            headers: {
                'Authorization': token
            }
        })
    }

    getArchivedNotes() {
        const token = localStorage.getItem("token")

        return axios.get(`${BaseURL}/getArchiveNotesList`, {
            headers: {
                'Authorization': token
            }
        })
    }
    getTrashedNotes() {
        return axios.get(`${BaseURL}/getTrashNotesList`, {
            headers: {
                'Authorization': token
            }
        })
    }


    getLabels() {
        const token = localStorage.getItem("token")

        return axios.get(`${labelurl}/getNoteLabelList`, {
            headers: {
                'Authorization': token
            }
        })
    }




    deleteForeverNotes(note) {
        return axios.post(`${BaseURL}/deleteForeverNotes`, note, {
            headers: {
                'Authorization': token
            }
        })
    }

    trashNote(note) {
        return axios.post(`${BaseURL}/trashNotes`, note, {
            headers: {
                'Authorization': token
            }
        })
    }


    changesColorNotes(note) {
        const token = localStorage.getItem("token")

        return axios.post(`${BaseURL}/changesColorNotes`, note, {
            headers: {
                'Authorization': token
            }
        })
    }

}
