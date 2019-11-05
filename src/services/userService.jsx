import axios from 'axios'
import {  toast } from 'react-toastify';
const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api/user";


class Services {
    loginService (data){
        
        return axios.post(`${BaseURL}/login`, data)
    }

    userRegister(data){
        console.log(" data in service ",data);
        toast.success("link is send to your email id. Please check Email", {
            position: toast.POSITION.TOP_CENTER
        });
        return axios.post(`http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp`,data)
        
    }

    
    
}

export default Services;