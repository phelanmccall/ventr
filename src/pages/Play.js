import React, { Component } from "react";
import HomeNav from "../components/HomeNav";
import CreateChar from "../components/CreateChar";
import axios from "axios";

class Play extends Component {

    state = {}

    constructor(props) {
        super(props);
        this.getChar();
    }

    getChar = () =>{
        axios.get("/char").then((response) => {
            console.log(response.data);
            this.setState({
                char: response.data
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                err: err
            })
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            this.state.char.name ?
                <div>
                    <HomeNav />
                    <div className="container" id="game">
                        <div id="battleground" style={this.state.battleground}>

                        </div>
                    </div>
                </div>
                :
                <div>
                    <CreateChar done={this.getChar} />
                </div>
        );
    }
}

export default Play;