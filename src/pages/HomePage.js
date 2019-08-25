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
      this.setup();
      this.getPosts();

    }

    setup = () =>{
        axios.get("/user").then((response) => {
            console.log(response.data);
            this.setState({
                user: response.data
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    getPosts = () =>{
        axios.get("/posts").then((response) => {
            console.log(response.data);
            this.setState({
                posts: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    submitPost = (e) =>{
        e.preventDefault();

        axios.post("/posts",{
            body: e.target.post.value
        }).then((response)=>{
            document.getElementById("proclaim").reset();
            this.getPosts();
        })
    }

    deletePost = (e) => {
        e.preventDefault();
        axios.delete(`/posts/${e.target.id}`).then((response)=>{
            console.log(response.data);
            this.getPosts();
        }).catch((err)=>{
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
                <HomeNav />
                <div className="row m-1">
                    <h1 className="col-7 m-auto text-warning bg-info p-5">Welcome {this.state.user.username}</h1>
                    <div className="col-7 post card m-auto text-light bg-dark p-5">
                        <form id="proclaim" onSubmit={this.submitPost}>
                            <label for="post">Proclaim:</label>
                            <textarea type="text" name="post"></textarea>
                            <input type="submit" />
                          
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

                                            <div className="col-12 bg-white">{value.body}</div>
                                            <small className="text-light">{"Date: " + value.createdAt}</small>
                                            <small className="text-light">{"Last edit: " +  value.updatedAt}</small>
                                            <button className="btn btn-danger" id={value.id} onClick={this.deletePost}>Delete</button>
                                            <button className="btn btn-info" id={value.id} >Edit</button>

                                        </div>
                                    </div>

                                );
                            })
                            :

                            <div className="row m-1">
                                <div className="col-7 post card m-auto bg-dark p-5">
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
