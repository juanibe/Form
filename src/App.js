import React from 'react';
import './App.css'; 
const nodemailer = require("nodemailer");

//Node mailer object

let transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
      user:"antiaemailer@gmail.com", 
      pass: "FuckYouBigTime"
  }
}); 

const emailRegex = RegExp (
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
); 

const formValid = ({formErrors, ...rest})=> {
  let valid = true; 
  
  //validate form errors being empty 
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false); 
  }); 

  //validate form was filled out 
  Object.values(rest).forEach(val => {val === null && (valid=false)})
  return valid; 
}; 

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  }; 
  
  
  handleSubmit = e => {
    e.preventDefault(); 
    if (formValid(this.state)){

      transporter.sendMail({
        from: "antiaemailer@gmail.com",
        to: this.state.email, 
        subject:"Contacto desde Formulario", 
        text: "Hola " + this.state.firstName + "<p>a ver donde aparece esto</p>", 
        html: "<h4>a ver donde aparece esto</h4>"
      }).then(() => {console.log ("notification sent")})

      console.log(`
      --SUBMITTING--
      First Name : ${this.state.firstName}
      Second Name : ${this.state.lastName}
      Email : ${this.state.email}
      `)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE"); 
    }
  };
  
  handleChange = e => {
    e.preventDefault(); 
    const { name, value} = e.target; 
    let formErrors = this.state.formErrors; 

    console.log ("the name is", name); 
    console.log ("the value is", value); 

    switch (name) {
      case"firstName":
        formErrors.firstName = 
        value.length <2 && value.length >0 
        ? "minimun 2 characters required"
        :""; 
      break; 
      case"lastName":
        formErrors.lastName = 
        value.length <2 && value.length >0 
        ? "minimun 2 characters required"
        :""; 
      break; 
      case"email":
      formErrors.email = 
        emailRegex.test (value) && value.length >0 
        ? ""
        :"invalid email address"; 
      break; 
    default: 
    break ; 
  }
  this.setState({ formErrors, [name]: value }, () => console.log(this.state));
};  

  render() {
    const {formErrors} = this.state; 
    return (
     <div className="wrapper"> 
      <div className="wrapper-form">
        <h1>Create account</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label> 
            <input
             type="text"
             className=""
             placeholder="First Name"
             name="firstName"
             noValidate
             onChange={this.handleChange}
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label> 
            <input
             type="text"
             className=""
             placeholder="Last Name" 
             name="lastName"
             noValidate
             onChange={this.handleChange}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label> 
            <input
             className={formErrors.email.length > 0 ? "error" : null}
             placeholder="Email"
             type="email"
             name="email"
             noValidate
             onChange={this.handleChange}
            /> 
            {formErrors.email.length > 0 && ( <span className="errorMessage">{formErrors.email}</span>)} 

          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
     </div>
    )
  } 
}   


export default App; 
