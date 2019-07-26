import React from "react";

import LoginForm from "../components/LoginForm";

class Login extends React.Component {
  componentWillMount(){
    API.getCurrentUser().then(response => {
      if(response.data.id){
        window.location.href = "/home"
      }
    })
  }
  render() {
    return (
      <div>
        <Navbar />     
        <div className="flexBox">
          <Registration />
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
