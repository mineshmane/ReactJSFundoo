import React, {Component} from 'react';
import Registration from '../components/registration';

export default class  SignUp extends Component{
    render(){
        return(
            // <Container>
            //     <SignUpComponent
            //      props ={this.props}
            //     />
            // </Container>
            <div>
                <Registration
                props ={this.props}
                />
            </div>
        );
    }
}