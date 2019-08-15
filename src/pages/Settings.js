import React, { Component } from "react";
import axios from "axios";
class Settings extends Component {

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
                <form onSubmit={this.changePrivacy} >
                    <div className="form-group">
                        <label for="privacy">Privacy</label>
                        <select>
                            <option value="Private">Private</option>
                            <option value="Friends Only">Friends Only</option>
                            <option value="Public">Public</option>
                        </select>       
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Update" />
                    </div>
                </form>
                <form>
                    <div className="form-group">
                        <label>Change Password</label>
                        <lable>Current Password</lable>
                        <input className="form-control" name="oldpass" type="password" placeholder="Current Password" required />
                        <lable>New Password</lable>
                        <input className="form-control" name="newpass" type="password" placeholder="New Password" required />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Sign up" />
                    </div>
                </form>

            </div>
        );
    }
}

export default Settings;