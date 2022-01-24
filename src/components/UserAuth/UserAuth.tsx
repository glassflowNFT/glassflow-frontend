import Login from "../Login/Login";
import { Modal } from '@material-ui/core'
import "./userAuth.css"
import { generateSentences } from "../LoremIpsum";

export default function UserAuth(props: {
  setShowAuth: (show: boolean) => void,
  showAuth: boolean
}) {
  return(
    <Modal
      open={props.showAuth}
      onClose={() => props.setShowAuth(false)}
      className="modal"
    >
      <div className="auth-wrapper fadeIn">
        <Login/>
        <section className="auth-right">
          <h1>GlassFlow</h1>
          <p>{generateSentences(3)}</p>
        </section>
      </div>
    </Modal>

  );
}