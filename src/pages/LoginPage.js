import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

class Login extends React.Component {
  state={
    err: ""
  }
  
  componentWillMount(){
 
  }
  
  signup = (e) => {
    e.preventDefault();
    
    console.log(e.target);
    
    if(e.target.password1.value && e.target.password1.value === e.target.password2.value){
      this.setState({
        err: "Passwords do not match."
      });
    }else{
      this.setState({
        err: "hey there hi there ho there"
      });
    }
  }
  
  render() {
    return (
      <div className="conatiner-fluid">
        <Navbar />     

        <div className="col-12 text-center">
        <img src="https://via.placeholder.com/250x250" className="img-fluid" />
       
        </div>
        <div className="col-12">
          <div id="err" className="text-danger">
            {
              this.state.err
            }
          </div>
          <form onSubmit={this.signup} >
             <input name="email" placeholder="Email"/>
             <input name="password1" placeholder="Password"/>
             <input name="password2" placeholder="Password"/>
             <input type="submit" value="Sign up" />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
