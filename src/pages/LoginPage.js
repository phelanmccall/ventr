import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

class Login extends React.Component {
  componentWillMount(){
 
  }
  render() {
    return (
      <div className="conatiner-fluid">
        <Navbar />     

        <div className="col-12 text-center">
        <img src="https://via.placeholder.com/250x250" className="img-fluid" />
       
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
