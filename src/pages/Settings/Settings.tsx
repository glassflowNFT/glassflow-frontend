import { useEffect, useState } from "react";
import { Image } from "react-feather";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import "./settings.css";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db, storage } from "../../firebase-config";
import { useSnackbar } from "notistack";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import { uid } from "uid";
import { REQUEST_DATA } from "../../helpers/interfaces";

export default function Settings() {

  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [profileSrc, setProfileSrc] = useState<string>("");
  const [currentProfilePicture, setCurrentProfilePicture] = useState<string>("");
  const [fetchedUserData, setFetchedUserData] = useState<any>();

  const inputUpdated = (set: (input: any) => void, value: string) => {
    set(value);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    if (user) getUserData();
  // eslint-disable-next-line
  }, [user]);

  const getUserData = async () => {
    // get db reference to current user
    const docRef = doc(db, "users", `${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFetchedUserData(data);
      // download profile URL from db
      if (data.profilePicture) {
        getDownloadURL(ref(storage, `${data.profilePicture}`))
        .then((url) => {
          setCurrentProfilePicture(url);
        });
      }
    } 
  }

  const profilePictureUpdated = (e: any) => {
    // grab file from file selector
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setProfileSrc(e.target.result);
    }
    reader.readAsDataURL(file);

    // setup file reference 
    const fileUid = uid();
    const fileName = `profiles/${user.uid}_${fileUid}_profile`;
    const storageRef = ref(storage, fileName);
    setUploading(true);
    uploadBytes(storageRef, file)
    .then(() => {
      setUploading(false);
      setProfilePicture(fileName);
    })
    .catch((e) => {
      console.log(e);
      setUploading(false);
    })
  }

  const saveChanges = () => {
    const stateVars = [
      [email, "email"],
      [bio, "bio"],
      [firstName, "firstName"],
      [lastName, "lastName"],
      [businessName, "businessName"],
      [licenseNumber, "licenseNumber"],
      [phoneNumber, "phoneNumber"],
      [profilePicture, "profilePicture"]
    ];

    let newData:any = {};

    // check if the var has been updated
    for (const data of stateVars) {
      if (data[0] !== "") {
        newData[`${data[1]}`] = data[0];
      }
    }

    enqueueSnackbar('Saving changes' ,{
      variant: "info",
      persist: false
    });

    // update user data
    updateDoc(doc(db, "users", `${user.uid}`), newData)
    .then(() => {
      enqueueSnackbar('Changes saved' ,{
        variant: "success",
        persist: false
      });
    })
    .catch((e: any) => {
      enqueueSnackbar('Failed to save changes' ,{
        variant: "error",
        persist: false
      });
    });
  }

  const requestVerification = async () => {
    const requestData:REQUEST_DATA = {
      bio: fetchedUserData.bio,
      businessName: fetchedUserData.businessName,
      email: fetchedUserData.email,
      firstName: fetchedUserData.firstName,
      lastName: fetchedUserData.lastName,
      licenseNumber: fetchedUserData.licenseNumber,
      phoneNumber: fetchedUserData.phoneNumber,
      uid: fetchedUserData.uid
    }
    // send request to request db
    await setDoc(doc(db, "requests", `${fetchedUserData.uid}`), requestData);
    enqueueSnackbar('Request sent. Please wait until an admin approves or rejects your request' ,{
      variant: "success",
      persist: false
    });
  }

  return (
    <div className="settings-wrapper page-wrapper">
      <h1>Settings</h1>
      <p className="secondary">Here you can update info about your account</p>
      <section className="settings-edit-section">
        <section className="settings-field-section double">
          <section className="settings-field-section current-profile">
            <span>Current Profile Picture</span>
            <div className="current-profile-wrapper">
              <img
                className="current-profile-picture"
                src={currentProfilePicture}
                alt="current-profile"
              />
            </div>
          </section>
          <section className="settings-field-section new-profile">
            <span>Upload New Profile Picture</span>
            <div className="file-selector-wrapper">
              <input
                className="file-selector"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => profilePictureUpdated(e)}
              ></input>
              {!uploading ? <Image /> : <CircularProgress />}
              {profileSrc !== "" ? (
                <div className="new-profile-wrapper">
                  <img
                    className="new-profile-picture"
                    src={profileSrc}
                    alt="new-profile"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <span className="secondary hint">
              File types supported: JPG, JPEG, PNG
            </span>
          </section>
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
        <section className="settings-field-section">
          <button className="primary-button user-verification-button" onClick={requestVerification}>
            Request User Verification
          </button>
        </section>
        <button className="primary-button" onClick={saveChanges}>
          Save Changes
        </button>
      </section>
    </div>
  );
}