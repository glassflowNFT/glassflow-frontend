import { Fragment } from "react";
import "./login.css";

export default function Login(props: {setShowLogin: (show: boolean) => void}) {

  const toggleAuthSection = (e: any) => {
    e.preventDefault();
    props.setShowLogin(false);
  }

  return (
    <Fragment>
      <section className="auth-left login-wrapper">
        <div className="auth-header">
          <h1>Login</h1>
          <span className="secondary">
            <b>*</b> Required Fields
          </span>
        </div>
        <section className="auth-field-section">
          <span>
            Email <b>*</b>
          </span>
          <input placeholder="your_email@email.com"></input>
        </section>
        <section className="auth-field-section">
          <span>
            Password <b>*</b>
          </span>
          <input placeholder="********"></input>
        </section>
        <button className="primary-button">Login</button>
        <a href="/" onClick={toggleAuthSection} className="toggle-auth">
          <span className="secondary">No account yet? Sign Up here</span>
        </a>
      </section>
    </Fragment>
  );
}