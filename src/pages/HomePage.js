import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";

class Home extends Component {
  state = {
    user: {},
    projects: {}
  };

  componentDidMount() {
  
  }

  render() {
    let display;
    const { avatar, firstName } = this.state.user
    if (this.state.user) {
        display = <p>Hello {this.state.user.firstName}!</p>
    } else {
        display = <p>Hello there! <a href="/">Sign up here!</a></p>
    }

    return (
        <div>
            <HomeNav options={this.state.user} />
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <img className="jumbotron-avatar" src={avatar} alt={firstName} width="150" height="150" />
                        <h1 className="display-4">{display}</h1>
                        <p className="lead">Search for Startups to Endorse or <Link to="/projects" id="linkToProjects">Add A Project</Link> to get Endorsed!</p>

                    </div>
                    </div>
                    <div>
                    <h1 className="subTitle">New Posts!</h1>
                   
                </div>
         
            <Footer />
        </div>
    )
}
}

export default Home;
