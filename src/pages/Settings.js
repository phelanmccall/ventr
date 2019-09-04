import React, { Component } from "react";
import HomeNav from "../components/HomeNav";
import axios from "axios";
class Settings extends Component {

    changeBio = (e) => {
        e.preventDefault();
        axios.put("/update/bio",
            {
                bio: e.target.bio.value
            }).then((response) => {
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    changePassword = (e) => {
        e.preventDefault();
        axios.put("/update/password",
            {
                oldpass: e.target.oldpass.value,
                newpass: e.target.newpass.value
            }).then((response) => {
                console.log(response.data);

            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <HomeNav />
                <div className="container mt-5">

                    <form onSubmit={this.changeBio} >
                        <div className="form-group">
                            <label for="privacy">Bio</label>
                            <input type="text" name="bio"></input>
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

            </div>
        );
    }
}

export default Settings;