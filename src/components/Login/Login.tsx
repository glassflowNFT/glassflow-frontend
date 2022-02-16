import { Fragment, useState } from "react";
import "./login.css";

export default function Login(props: { 
  setShowLogin: (show: boolean) => void, 
  userLogin: (email: string, password: string) => void 
}) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toggleAuthSection = (e: any) => {
    e.preventDefault();
    props.setShowLogin(false);
  }

  const inputUpdated = (set: (input: any) => void, value: string) => {
    set(value);
  }

  const loginClicked = () => {
    props.userLogin(email, password);
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
          <input 
            placeholder="your_email@email.com" 
            type="email"
            onChange={(e) => inputUpdated(setEmail, e.target.value)}
          ></input>
        </section>
        <section className="auth-field-section">
          <span>
            Password <b>*</b>
          </span>
          <input 
            placeholder="********" 
            type="password" 
            onChange={(e) => inputUpdated(setPassword, e.target.value)}
            value={password}
          >
          </input>
        </section>
        <button className="primary-button" onClick={loginClicked}>Login</button>
        <a href="/" onClick={toggleAuthSection} className="toggle-auth">
          <span className="secondary">No account yet? Sign Up here</span>
        </a>
      </section>
    </Fragment>
  );
}