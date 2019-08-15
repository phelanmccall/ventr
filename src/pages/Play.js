import React, { Component } from "react";
import axios from "axios";
class Play extends Component {

    changePrivacy = (e) =>{
        e.preventDefault();
        axios.put("/update/privacy",
        {
            privacy: e.target.privacy.value
        }).then((response)=>{
            console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    changePassword = (e) =>{
        e.preventDefault();
        axios.put("/update/password",
        {
            oldpass: e.target.oldpass.value,
            newpass: e.target.newpass.value
        }).then((response)=>{
            console.log(response.data);

        }).catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <h1>PLAY</h1>
            </div>
        );
    }
}

export default Play;