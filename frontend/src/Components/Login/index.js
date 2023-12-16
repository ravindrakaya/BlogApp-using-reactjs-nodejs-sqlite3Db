import { Component } from "react";
import { Link} from "react-router-dom";
import axios from "axios";

import "./index.css";

class Login extends Component {
  
  state = {
    username: "",
    password: "",
    isValid: false,
    userAlert: "",
    passwordAlert: ""
  };

  onClickLoginBtn = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    //console.log(userDetails);
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userDetails
      );
      console.log(response.data);

      
      if (response.data.code === 200) {
        alert("Login Successful!");
        const a = document.createElement("a");
        a.href = "http://localhost:3000/Home";
        a.target = "_self";
        a.click();
      }
      
      if (response.data.code === 400) {
        this.setState({
          isValid: true,
          msgAlert: response.data.message
        });
        alert("Invalid Valid Username or Password. Please try again.");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid Valid Username or Password. Please try again.");
    }
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    const { username, password, isValid, msgAlert} = this.state;

    return (
      <>
        <div className="blog-container">
          <h1 className="blog-title">My Blog</h1>
        </div>
        <form className="login-form-container" onSubmit={this.onClickLoginBtn}>
          <div className="login-input-field">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              className="login-input"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
    
          </div>
          <div className="login-input-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              className="login-input"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {isValid && (
              <span className="error-msg">{msgAlert} </span>
            )}
          <div className="tag-login-container">
            <p className="tag-login-para">Don't you have account?</p>
            <Link to="/signup/" className="link-element">
              <button type="button" className="tag-login-btn">
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </>
    );
  }
}

export default Login;