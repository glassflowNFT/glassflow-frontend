import { useState } from "react";
import { Image } from "react-feather";
import "./settings.css";

export default function Settings() {

  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const inputUpdated = (set: (input: any) => void, value: string) => {
    set(value);
  };

  const saveChanges = async() => {

  }

  return(
    <div className="settings-wrapper page-wrapper">
      <h1>Settings</h1>
      <p className="secondary">Here you can update info about your account</p>
      <section className="settings-edit-section">
        <section className="settings-field-section">
          <span>Profile Picture</span>
          <div className="file-selector-wrapper">
            <input
              className="file-selector"
              type="file"
              accept=".jpg, .jpeg, .png"
            ></input>
            <Image />
          </div>
          <span className="secondary hint">
            File types supported: JPG, JPEG, PNG
          </span>
        </section>
        <section className="settings-field-section double">
          <section className="settings-field-section">
            <span>
              First Name <b>*</b>
            </span>
            <input
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => inputUpdated(setFirstName, e.target.value)}
            ></input>
          </section>
          <section className="settings-field-section">
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
        <section className="settings-field-section">
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
            Profile Bio <b>*</b>
          </span>
          <textarea
            placeholder="This will be displayed on your profile. Use this to describe who you are, what you do. Feel free to be creative as you want"
            value={bio}
            onChange={(e) => inputUpdated(setBio, e.target.value)}
          ></textarea>
        </section>
        <section className="settings-field-section">
          <span>
            Photo ID
            <span className="secondary hint">
              If you would like to become a verified user you are required to
              submit a photo of your government-issued ID
            </span>
          </span>
          <div className="file-selector-wrapper">
            <input
              className="file-selector"
              type="file"
              accept=".jpg, .jpeg, .png"
            ></input>
            <Image />
          </div>
          <span className="secondary hint">
            File types supported: JPG, JPEG, PNG
          </span>
        </section>
        <section className="settings-field-section">
          <span>Business Name</span>
          <input
            placeholder="The name of your business"
            type="text"
            onChange={(e) => inputUpdated(setBusinessName, e.target.value)}
            value={businessName}
          />
        </section>
        <section className="settings-field-section">
          <span>Business Tax ID Number / Business License Number</span>
          <input
            placeholder="The legally isued license number for your business"
            type="text"
            onChange={(e) => inputUpdated(setLicenseNumber, e.target.value)}
            value={licenseNumber}
          />
        </section>
        <section className="settings-field-section">
          <span>Phone Number</span>
          <input
            placeholder="Phone number"
            type="text"
            onChange={(e) => inputUpdated(setPhoneNumber, e.target.value)}
            value={phoneNumber}
          />
        </section>
        <button 
          className="primary-button"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </section>
    </div>
  );
}