import Login from "../Login/Login";
import { Modal } from '@material-ui/core'
import "./userAuth.css"
import { useState } from "react";
import Signup from "../Singup/Signup";
import { auth, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useSnackbar } from 'notistack';
import { doc, setDoc, getDoc } from "firebase/firestore"; 


export default function UserAuth(props: {
  setShowAuth: (show: boolean) => void,
  showAuth: boolean
}) {

  const { enqueueSnackbar } = useSnackbar();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  // const [userID, setUserID] = useState<string>("");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // get db reference to current user
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
      } 
    }
  });

  const userLogOut = async () => {
    signOut(auth);
    enqueueSnackbar('Successfully logged out' ,{
      variant: "success"
    });
  }

  // log the user in using firebase auth
  const userLogin = async (email: string, password: string) => {
    enqueueSnackbar('Logging in' ,{
      variant: "info"
    });
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password 
      );
      console.log(user);
      enqueueSnackbar('Successfully logged in' ,{
        variant: "success"
      });
      props.setShowAuth(false);
    } catch (error: any) {
      enqueueSnackbar('Login failed' ,{
        variant: "error"
      });
      console.log(error.message);
    }
  }

  // register the user using firebase auth
  const userSignup = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    bio: string,
    businessName: string,
    licenseNumber: string,
    phoneNumber: string 
  ) => {
    try {
      // create user account with email + password
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password 
      );
      if (user) {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", `${user.user.uid}`), {
          firstName,
          lastName,
          email,
          bio,
          displayName: `${firstName} ${lastName}`,
          businessName,
          licenseNumber,
          phoneNumber
        });
        enqueueSnackbar('Successfully signed up' ,{
          variant: "success"
        });
        props.setShowAuth(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Sign up failed' ,{
        variant: "error"
      });
      console.log(error);
    }
  }

  return (
    <Modal
      open={props.showAuth}
      onClose={() => props.setShowAuth(false)}
      className="modal"
    >
      <div className="auth-wrapper fadeIn">
        {showLogin ? (
          <Login setShowLogin={setShowLogin} userLogin={userLogin} />
        ) : (
          <Signup setShowLogin={setShowLogin} userSignup={userSignup} />
        )}
        <section className="auth-right">
          <h1>GlassFlow</h1>
          <p onClick={userLogOut}>
            NFT MINTING, GENETIC AUTHENTICITY, INCENTIVIZING GLASS ART
            ECOSYSTEM. WE OFFER IMMUTABLE HISTORICAL CERTIFICATES, FUSE DIGITAL
            ITEMS WITH TANGIBLE ART, AND CUSTOM COLLECTIONS WITH EVOLVING
            UTILITIES
          </p>
        </section>
      </div>
    </Modal>
  );
}