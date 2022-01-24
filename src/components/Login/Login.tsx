import { Fragment } from "react";
import "./login.css";

export default function Login() {
  return (
    <Fragment>
      <section className="auth-left">
        <div className="auth-header"> 
          <h1>Login</h1>
          <span><b>*</b> Required Fields</span>
        </div>
        <section className="auth-field-section">
          <span>Email <b>*</b></span>
          <input placeholder="your_email@email.com"></input>
        </section>
        <section className="auth-field-section">
          <span>Password <b>*</b></span>
          <input placeholder="********"></input>
        </section>
        <button className="primary-button">Login</button>
      </section>
    </Fragment>
  );
}