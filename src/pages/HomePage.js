import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import axios from "axios";

class Home extends Component {
    state = {
        user: {},
        posts: {}
    };

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log(response.data);
            this.setState({
                user: response.data
            }, () => {
                axios.get("/posts").then((response) => {
                    console.log(response.data);
                    this.setState({
                        posts: response.data
                    })
                }).catch((err) => {
                    console.log(err);
                })
            });
        }).catch((err) => {
            console.log(err);
        })

    }

    render() {
        let display;
        const { avatar, username } = this.state.user
        if (this.state.user) {
            display = <p>Hello {this.state.user.username}!</p>
        } else {
            display = <p>Hello there! <a href="/">Sign up here!</a></p>
        }
        console.log(this.state.user);
        return (
            <div>
                <HomeNav options={this.state.user} />
                <div className="row m-1">
                    <h1 className="col-7 m-auto text-warning bg-info p-5">Welcome {this.state.user.username}</h1>
                    <div className="col-7 post card m-auto text-light bg-dark p-5">
                        <form action="/posts" method="post">
                            <label for="post">Proclaim:</label>
                            <textarea type="text" name="post"></textarea>
                            <input id="proclaim" type="submit" />
                            <select name="privacy">
                                <option value="public">Public</option>
                                <option value="friends">Friends only</option>
                                <option value="private">Private</option>
                            </select>
                        </form>
                    </div>
                </div>

                <div id="board" className="container mt-5">

                    {
                        this.state.posts.length ?

                            this.state.posts.map((value, index) => {
                                return (
                                    <div className="row m-1">
                                        <div className="col-7 post card m-auto bg-dark p-5">
                                            <h2 className="bg-secondary text-white p-1 m-1">{this.state.user.username}</h2>

                                            <div className="col-12 bg-white">{value.body}</div>
                                            <small className="text-light">{value.createdAt}</small>
                                        </div>
                                    </div>

                                );
                            })
                            :

                            <div className="row m-1">
                                <div className="col-7 post card m-auto bg-dark p-5">
                                    <h2 className="bg-secondary text-white p-1 m-1">{this.state.user.username}</h2>

                                    <div className="col-12 bg-white ">Make some posts!</div>
                                </div>
                            </div>

                    }



                </div>

                <Footer />
            </div>
        )
    }
}

export default Home;
