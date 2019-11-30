import React, {Component} from 'react';
import Login from '../components/login';


export default class  SignIn extends Component{
    render(){
        return(
        
          
            <div>
                <Login
                props ={this.props}
                />
            </div>
        );
    }
}