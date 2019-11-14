import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './pages/login'
import SignUp from './pages/sinUp'
import UserDashboard from './pages/dashboardPage'
import createNote from './components/createNote'
import { GetReminderNotes } from './components/ReminderNotes';
import { GetAllNotes } from './components/getAllNotes';
import { GetArchivedNotes } from './components/getArchiveNotes'
import { GetTrashNotes } from './components/getTrashNotes'
import {NotesByLabel} from './components/getNoteByLabel'
import  { DashboardComponent } from './components/dashboard'
// import { Registration } from './components/registration';
// import { Login } from './components/login';
function App() {
  return (


    <Router>
      <Route exact path="/login" component={SignIn} />
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/login" component={SignIn} /> */}
      {/* <Route path='/resetpassword/:token' component */}
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/dashboard/notes" component={GetAllNotes} />
      <Route path="/createNote" component={createNote} />
      <Route path="/dashboard/reminder" component={GetReminderNotes} />

      <Route path="/dashboard/getNotesByLabel/:labelName" component={NotesByLabel} />

      {/* <Route path="/dashboard/getNotesByLabel" component={NotesByLabel} /> */}



      <Route path="/dashboard/Archive" component={GetArchivedNotes} />
      <Route path="/dashboard/TrashNotes" component={GetTrashNotes} />



    </Router>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // <Login/>
  );
}

export default App;
