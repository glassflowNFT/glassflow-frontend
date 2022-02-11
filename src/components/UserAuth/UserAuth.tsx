import Login from "../Login/Login";
import { Modal } from '@material-ui/core'
import "./userAuth.css"
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
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Signup setShowLogin={setShowLogin} />
        )}
        <section className="auth-right">
          <h1>GlassFlow</h1>
          <p>
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