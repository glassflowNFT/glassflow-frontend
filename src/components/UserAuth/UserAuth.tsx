import Login from "../Login/Login";
import { Modal } from '@material-ui/core'
import "./userAuth.css"
import { useState } from "react";
import Signup from "../Singup/Signup";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useSnackbar } from 'notistack';

export default function UserAuth(props: {
  setShowAuth: (show: boolean) => void,
  showAuth: boolean
}) {

  const { enqueueSnackbar } = useSnackbar();
  const [showLogin, setShowLogin] = useState<boolean>(true);

  onAuthStateChanged(auth, (currentUser) => {
    // setUser(currentUser);
    console.log(currentUser)
  });

  const userLogOut = async () => {
    signOut(auth);
    enqueueSnackbar('Successfully logged out' ,{
      variant: "info"
    });
  }

  // log the user in using firebase auth
  const userLogin = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password 
      );
      console.log(user);
      enqueueSnackbar('Successfully logged in' ,{
        variant: "info"
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
  // TODO: accept bio, first name, last name, photo, etc
  const userSignup = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password 
      );
      console.log(user);
      enqueueSnackbar('Successfully signed up' ,{
        variant: "info"
      });
      props.setShowAuth(false);
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