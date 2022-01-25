import Login from "../Login/Login";
import { Modal } from '@material-ui/core'
import "./userAuth.css"
import { generateSentences } from "../LoremIpsum";
import { useState } from "react";
import Signup from "../Singup/Signup";

export default function UserAuth(props: {
  setShowAuth: (show: boolean) => void,
  showAuth: boolean
}) {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  return (
    <Modal
      open={props.showAuth}
      onClose={() => props.setShowAuth(false)}
      className="modal"
    >
      <div className="auth-wrapper fadeIn">
        {showLogin ? <Login setShowLogin={setShowLogin}/> : <Signup setShowLogin={setShowLogin}/>}
        <section className="auth-right">
          <h1>GlassFlow</h1>
          <p>{generateSentences(3)}</p>
        </section>
      </div>
    </Modal>
  );
}