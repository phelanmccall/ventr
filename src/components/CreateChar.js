import React, { Component } from "react";
import axios from "axios";


class CreateChar extends Component {

    state= {
        str: 5,
        def: 5,
        agi: 5,
        wis: 5,
        luk: 5,
        points: 10
    }
    sendChar = (e) =>{
        e.preventDefault();

        axios.put("/char", {

        }).then((response)=>{
            console.log(response.data);
            this.props.done();
        }).catch((err)=>{
            console.log(err);
        })
    }

    addStat = (e) =>{
        let stat = this.state[e.target.id];
        let left = this.state.points;
        if( left > 0){
            
            this.setState({
                [e.target.id]: stat + 1,
                points: left - 1
            })
        }
    }

    minusStat = (e) => {
        let stat = this.state[e.target.id];
        let left = this.state.points;
        this.setState({
            [e.target.id]: stat - 1,
            points: left + 1
        })
    }

    render() {
        return (
            <div>
                <h1>Create your character.</h1>

                <form onSubmit={this.sendChar}>
                    <button onClick={this.minusStat} id="str">-</button><span>{this.state.str}</span><button onClick={this.addStat} id="str">+</button>
                    <button onClick={this.minusStat} id="def">-</button><span>{this.state.def}</span><button onClick={this.addStat} id="def">+</button>
                    <button onClick={this.minusStat} id="agi">-</button><span>{this.state.agi}</span><button onClick={this.addStat} id="agi">+</button>
                    <button onClick={this.minusStat} id="wis">-</button><span>{this.state.wis}</span><button onClick={this.addStat} id="wis">+</button>
                    <button onClick={this.minusStat} id="luk">-</button><span>{this.state.luk}</span><button onClick={this.addStat} id="luk">+</button>

                    <input type="submit"></input>
                </form>
            </div>
            );
    }
}

export default CreateChar;
