import { Fragment, useState } from "react";
import { Image } from "react-feather";

export default function Signup(props: { 
  setShowLogin: (show: boolean) => void, 
  userSignup: (email: string, password: string) => void 
}) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const toggleAuthSection = (e: any) => {
    e.preventDefault();
    props.setShowLogin(true);
  }

  const signupClicked = () => {
    props.userSignup(
      email,
      password
    );
  }

  const inputUpdated = (set: (input: any) => void, value: string) => {
    set(value);
  }

  return (
    <Fragment>
      <section className="auth-left signup-wrapper">
        <div className="auth-header">
          <h1>Sign Up</h1>
          <span className="secondary">
            <b>*</b> Required Fields
          </span>
        </div>
        <section className="auth-field-section double">
          <section className="auth-field-section">
            <span>
              First Name <b>*</b>
            </span>
            <input 
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => inputUpdated(setFirstName, e.target.value)}
            ></input>
          </section>
          <section className="auth-field-section">
            <span>
              Last Name <b>*</b>
            </span>
            <input 
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => inputUpdated(setLastName, e.target.value)}
            ></input>
          </section>
        </section>
        <section className="auth-field-section">
          <span>
            Email <b>*</b>
          </span>
          <input 
            placeholder="your_email@email.com" 
            type="email"
            onChange={(e) => inputUpdated(setEmail, e.target.value)}
            value={email}
          ></input>
        </section>
        <section className="auth-field-section">
          <span>
            Password <b>*</b><span className="secondary hint">must contain at least 8 characters and use one special character</span>
          </span>
          <input 
            placeholder="********" 
            type="password" 
            onChange={(e) => inputUpdated(setPassword, e.target.value)}
            value={password}
          >
          </input>
        </section>
        <section className="auth-field-section">
          <span>
            Profile Bio <b>*</b>
          </span>
          <textarea 
            placeholder="This will be displayed on your profile. Use this to describe who you are, what you do. Feel free to be creative as you want"
            value={bio}
            onChange={(e) => inputUpdated(setBio, e.target.value)}
          >
          </textarea>
        </section>
        <section className="auth-field-section">
          <span>
            How do you plan on using GlassFlow?<b>*</b>
          </span>
          <div className="checkbox-wrapper">
            <div className="checkbox">
              <input type="checkbox"/>
              <span className="secondary">I plan to create cannabis orientated NFT collections</span>
            </div>
            <div className="checkbox">
              <input type="checkbox"/>
              <span className="secondary">Genetic Registration</span>
            </div>
            <div className="checkbox">
              <input type="checkbox"/>
              <span className="secondary">I am an independent glass artist</span>
            </div>
            <div className="checkbox">
              <input type="checkbox"/>
              <span className="secondary">I own a business in cannabis</span>
            </div>
            <div className="checkbox">
              <input type="checkbox"/>
              <span className="secondary">I am a current partner of Glassflow</span>
            </div>
          </div>
        </section>
        <section className="auth-field-section">
          <span>
            Photo ID
            <span className="secondary hint">If you would like to become a verified user you are required to submit a photo of your government-issued ID</span>
          </span>
          <div className="file-selector-wrapper">
            <input className="file-selector" type="file" accept=".jpg, .jpeg, .png"></input>
            <Image/>
          </div>
          <span className="secondary hint">File types supported: JPG, JPEG, PNG</span>
        </section>
        <button className="primary-button" onClick={signupClicked}>Sign Up</button>
        <a href="/" onClick={toggleAuthSection} className="toggle-auth">
          <span className="secondary">Already have an account? Login here</span>
        </a>
      </section>
    </Fragment>
  );
}