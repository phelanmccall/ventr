import React, { Component } from "react";
import HomeNav from "../components/HomeNav";
import axios from "axios";

class Play extends Component {

    state ={}

    constructor(props){
        super(props);
        axios.get("/char").then((response)=>{
            console.log(response.data);
            this.setState({
                char: response.data
            });
        }).catch((err)=>{
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
            <div>
                <HomeNav />

                <div className="container" id="game">
                    <div id="battleground" style={this.state.battleground}>

                    </div>
                </div>


            </div>
        );
    }
}

export default Play;