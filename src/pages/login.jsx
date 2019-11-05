import React, {Component} from 'react';
import Login from '../components/login';
// import { Container} from 'reactstrap'
// import SignInComponent from '../components/SignInComponent'

export default class  SignIn extends Component{
    render(){
        return(
            // <Container>
            //     <SignInComponent
            //     props ={this.props}
            //     />
            // </Container>
            <div>
                <Login
                props ={this.props}
                />
            </div>
        );
    }
}