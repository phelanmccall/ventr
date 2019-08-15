import React, { Component } from "react";
import axios from "axios";
class Navbar extends Component {

    login = (e) =>{
        e.preventDefault();
        axios.post("/login", {
            username: e.target.email.value,
            password: e.target.password.value
        }).then((response)=>{
            if(response.data.id){
                console.log("YAY");
                window.location.replace("/home");
                return false;
            }else{
                console.log("No user");
                window.location.replace(response.data);
                return false;
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">

                    <a className="navbar-brand" href="/">
                        <img src="/ventrLogo.jpg" width="30" height="30"
                            className="align-top" alt="~\\~"
                            style={{ borderRadius: 7 }} />Ventr</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <form className="ml-auto mr-0" onSubmit={this.login}>
                            <input type="email" name="email" id="inputEmail" className="btn btn-light border  mr-sm-2" placeholder="Email address" required="" autofocus="" />
                            <input type="password" name="password" id="inputPassword" className="btn btn-light border  mr-sm-2" placeholder="Password" required="" autofocus="" />
                            <button type="submit" className="btn btn-primary my-2 my-sm-0">Submit</button>
                        </form>
                    </div>

                </nav>
            </div>
        );
    }
}

export default Navbar;