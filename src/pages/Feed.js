import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import axios from "axios";

class Feed extends Component {
    state = {
        posts: {}
    };

    componentDidMount() {
      this.getPosts();

    }

    likePost = (e) => {
        e.preventDefault();
        console.log(e.target.dataset);
        axios.post("/like", {
            post: e.target.dataset.post
        }).then((response)=>{
            console.log(response.data);
            this.getPosts();
        }).catch((err)=>{
            console.log(err);
        })
    }

    getPosts = () =>{
        axios.get("/everypost").then((response) => {
            console.log(response.data);
            this.setState({
                posts: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
     
        return (
            <div>
                <HomeNav />

                <div id="board" className="container mt-5">

                    {
                        this.state.posts.length ?

                            this.state.posts.map((value, index) => {
                                return (
                                    <div className="row m-1">
                                        <div className="col-7 post card m-auto bg-dark p-5">
                                            <h2>{"User: " + value.user}</h2>
                                            <label>Post:</label>
                                            <div className="col-12 bg-white">{value.body}</div>
                                            <small className="text-light">{"Date: " + value.createdAt}</small>
                                            <small className="text-light">{"Last edit: " +  value.updatedAt}</small>
                                            <button data-post={value.id}className="btn btn-primary" onClick={this.likePost}>Acknowledge</button>
                                            <small>{value.score}</small>
                                        </div>
                                    </div>

                                );
                            })
                            :

                            <div className="row m-1">
                                <div className="col-7 post card m-auto bg-dark p-5">
                                    <div className="col-12 bg-white ">No posts!</div>
                                </div>
                            </div>

                    }



                </div>

                <Footer />
            </div>
        )
    }
}

export default Feed;
