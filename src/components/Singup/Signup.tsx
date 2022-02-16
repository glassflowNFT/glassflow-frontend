import { Fragment, useState } from "react";
import { Image } from "react-feather";

export default function Signup(props: { 
  setShowLogin: (show: boolean) => void, 
  userSignup: (email: string, password: string, firstName: string, lastName: string, bio: string) => void 
}) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const choices = [
    "I plan to create cannabis oriented NFT collections",
    "I plan on using Genetic Registration",
    "I am an independent glass artist",
    "I own a business in cannabis",
    "I am a current partner GlassFlow"
  ];
  const [choicesArray, setChoicesArray] = useState<boolean[]>([...new Array(choices.length).fill(false)])
  
  const toggleAuthSection = (e: any) => {
    e.preventDefault();
    props.setShowLogin(true);
  }

  const signupClicked = () => {
    props.userSignup(
      email,
      password,
      firstName,
      lastName,
      bio
    );
  }

  const inputUpdated = (set: (input: any) => void, value: string) => {
    set(value);
  }

  const updateChoicesArray = (index: number) => {
    // create copy of choices array
    const newChoices = [...choicesArray];
    // update selected choice
    newChoices[index] = !newChoices[index];
    // update state
    setChoicesArray(newChoices);
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
            {choices.map((text, index) => 
              <div className="checkbox">
                <input
                  type="checkbox" 
                  checked={choicesArray[index]}
                  onClick={(e) => updateChoicesArray(index)}
                />
                <span 
                  className="secondary"
                  onClick={(e) => updateChoicesArray(index)}
                >
                  {text}
                </span>
              </div>
            )}
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