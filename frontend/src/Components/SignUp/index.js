import { Component } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "./index.css";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    isChecked: false,
    isValidCaptcha: false,
    errorObj: {},
    checkUsername: false,
    userAlert: ""
  };

  onBlurUserName = async (event) => {
    const response = await axios.post("http://localhost:5000/username",{username:event.target.value});
    console.log(response);
    if (response.data.code === 400) {
      this.setState({
        checkUsername: true,
        userAlert: response.data.message
      })
    }else {
      this.setState({
        checkUsername: false,
        userAlert: response.data.message
      })
    }
  }
   

  validateForm = () => {
    const { name, email, phone, username, password } = this.state;
    let newObj = {};
    let isValid = true;
    // validating user name
    if (!name.trim()) {
      newObj.name = "Name is Required*";
      isValid = false;
    }

    // validating user email
    if (!email.trim()) {
      newObj.email = "Email is Required*";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newObj.email = "Invalid Email";
      isValid = false;
    }

    // validating user phone
    if (!phone.trim()) {
      newObj.phone = "Phone number is required*";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newObj.phone = "Invalid Phone(must be 10 digits)";
      isValid = false;
    }

    // validating username
    if (!username.trim()) {
      newObj.username = "Name is Required*";
      isValid = false;
    }

    // validating password
    if (!password.trim()) {
      newObj.password = "Password is Required*";
      isValid = false;
    }

    this.setState({
      errorObj: newObj,
    });

    return isValid;
  };

  onChangeCheckbox = (event) => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  onClickRegisterBtn = async (event) => {
    event.preventDefault();
    const {
      isChecked,
      name,
      email,
      phone,
      username,
      password,
      isValidCaptcha,
    } = this.state;
    let values;

    if (this.validateForm()) {
      console.log("Form Submitted Successfully");
      values = { name, email, phone, username, password };
    } else {
      console.log("Form validation Failed");
    }

    if (this.validateForm() && isChecked && isValidCaptcha) {
      try {
        const response = await axios.post(
          "http://localhost:5000/signup",
          values
        );
        alert("User registered successfully!");
        console.log(response.status);
        if (response.status === 200) {
           const a = document.createElement("a");
          a.href = "http://localhost:3000/login/";
          a.target = "_self";
          a.click(); 
          console.log(this.props);
        }
      } catch (error) {
        console.log(error);
        alert("Error during registration. Please try again.");
      }
    }
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onChangeCaptcha = () => {
    this.setState({
      isValidCaptcha: true,
    });
  };

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangePhone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    const {
      name,
      email,
      phone,
      username,
      password,
      isChecked,
      errorObj,
      checkUsername,
      userAlert
    } = this.state;

    return (
      <div className="registration-container">
        <div className="blog-container">
          <h1 className="blog-title">My Blog</h1>
        </div>
        <h1 className="register-heading">Sign up</h1>
        <form className="form-container" onSubmit={this.onClickRegisterBtn}>
          <div className="input-container">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter Your Name"
              className="input-field"
              onChange={this.onChangeName}
            />
            {errorObj.name && (
              <span className="error-msg">{errorObj.name} </span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="input-field"
              value={email}
              onChange={this.onChangeEmail}
            />
            {errorObj.email && (
              <span className="error-msg">{errorObj.email} </span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="phone" className="input-label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              placeholder="Enter Your Mobile Number"
              className="input-field"
              onChange={this.onChangePhone}
            />
            {errorObj.phone && (
              <span className="error-msg">{errorObj.phone} </span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="Username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className="input-field"
              value={username}
              onChange={this.onChangeUsername}
              onBlur={this.onBlurUserName}
            />
            {checkUsername && (
              <span className="error-msg">{userAlert} </span>
            )}
            {errorObj.username && (
              <span className="error-msg">{errorObj.username} </span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="input-field"
              value={password}
              onChange={this.onChangePassword}
            />
            {errorObj.password && (
              <span className="error-msg">{errorObj.password} </span>
            )}
          </div>
          <ReCAPTCHA
            sitekey="6LeyTS8pAAAAADXqM2T0xoglP38BG3zuvKqMHd01"
            onChange={this.onChangeCaptcha}
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox-field"
              onChange={this.onChangeCheckbox}
              value={isChecked}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              I agree to the
              <span className="span-el">Terms and Conditions*</span>
            </label>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p>Already have account Login here</p>
          <Link to="/login/" className="link-element1">
            <button type="button" className="login-btn1">
              Login
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
export default SignUp;