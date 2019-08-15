import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

class Login extends React.Component {
  state = {
    err: ""
  }

  componentWillMount() {

    axios.get("/user").then(response => {
      if (response.data.id) {
        window.location.href = "/home"
      }
    })

  }

  signup = (e) => {
    e.preventDefault();

    console.log(e.target.password1.value);
    console.log(e.target.password2.value);
    let target = e.target;
    if (target.password1.value.length === 0) {
      this.setState({
        err: "Password is empty."
      });
    } else if (target.password1.value !== target.password2.value) {
      this.setState({
        err: "Passwords don't match."
      });
    } else {
      axios.post("/signup", {
        email: target.email.value,
        username: target.username.value,
        password: target.password1.value
      }).then((response) => {
        if (response.data.id) {
          console.log("YAY");
          axios.post("/login", {
            username: target.email.value,
            password: target.password1.value
          }).then((response)=>{
            window.location.href = "/home";
          })
        }else{
          this.setState({
            err: response.data
          });
        }
      }).catch((err) => {
        console.log("SIGN UP " + err);
        this.setState({
          err: err.toString()
        });
      });
    }
  }

  render() {
    return (
      <div className="conatiner-fluid">
        <Navbar />

        <div className="col-12 text-center">
          <img src="https://via.placeholder.com/250x250" className="img-fluid m-1" />

        </div>
        <div className="col-12">
          <div id="err" className="text-danger">
            {
              this.state.err
            }
          </div>
          <form onSubmit={this.signup} >
            <div className="form-group">
              <input className="form-control" name="username" placeholder="Username" required />
            </div>
            <div className="form-group">
              <input className="form-control" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <input className="form-control" name="password1" type="password" placeholder="Password" required />
            </div>
            <div className="form-group">
              <input className="form-control" name="password2" type="password" placeholder="Password" required />
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" value="Sign up" />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
