import React, { Component } from "react";
import { Link } from "react-router-dom";


class HomeNav extends Component {

    render() {
        return (
            <div>
                <nav id="nav" className="navbar sticky-top navbar-expand navbar-dark bg-dark">

                <a className="navbar-brand" href="/">
                        <img src="/ventrLogo.jpg" width="30" height="30"
                            className="align-top" alt="~\\~"
                            style={{ borderRadius: 7 }} />Ventr</a>


                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/home" id="homeBtn">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/feed" id="portBtn">Feed</a>
                            </li>
                           
                            <li className="nav-item">
                                <a className="nav-link" href="/play" id="contBtn">Play</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/settings" id="portBtn">Settings</a>
                            </li>
                            <li>
                                <a className="nav-link" id="signout" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default HomeNav;
