import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import gradient from 'random-gradient';
import "./adminVerification.css";
import { useSnackbar } from "notistack";
import { REQUEST_DATA } from "../../helpers/interfaces";

export default function AdminVerification() {

  const [verificationRequests, setVerificationRequests] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchRequests();
  // eslint-disable-next-line
  }, []);

  const fetchRequests = async () => {

    let requests:any[] = [];

    // get all collections
    const collectionsRef = collection(db, "requests");
    const q = query(collectionsRef, where("email", "!=", ""))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // add to list
      if (doc.data())
        requests.push(doc.data());
    });

    setVerificationRequests(requests);

  }

  // true = accepted / false = rejected
  const buttonClicked = async (request: REQUEST_DATA, decision: boolean) => {
    try {
      if (decision) {
        await updateDoc(doc(db, "users", `${request.uid}`), {"verified": true})
        await deleteDoc(doc(db, "requests", request.uid));
        enqueueSnackbar('User has been verified' ,{
          variant: "success"
        });
      } else {
        await updateDoc(doc(db, "users", `${request.uid}`), {"verified": false})
        await deleteDoc(doc(db, "requests", request.uid));
        enqueueSnackbar('User has been rejected' ,{
          variant: "success"
        });
      }
    } catch {
      enqueueSnackbar('Action failed. Please try again' ,{
        variant: "error"
      });
    }
    // reload requests 
    fetchRequests();
  }

  const renderRequests = () => {
    return (
      verificationRequests.map((request: REQUEST_DATA) => {
        const displayName = `${request.firstName} ${request.lastName}`;
        const count = Math.round(Math.random() * (500 - 0) + 0);
        const bgGradient = { background: gradient(count.toString()) };
        return (
          <div className="verification-request">
            <section className="verification-request-image-wrapper" style={bgGradient}>
            </section>
            <section className="verification-request-data">
              <div className="verification-request-section">
                {displayName} 
              </div>
              <div className="verification-request-section">
                Bio: {request.bio} 
              </div>
              <div className="verification-request-section">
                Email: {request.email} 
              </div>
              <div className="verification-request-section">
                Business License Number: {request.licenseNumber} 
              </div>
              <div className="verification-request-section">
                Phone Number: {request.phoneNumber} 
              </div>
              <div className="verification-request-action-section">
                <button 
                  className="primary-button"
                  onClick={() => buttonClicked(request, true)}
                >
                  Accept
                </button>
                <button 
                  className="primary-button"
                  onClick={() => buttonClicked(request, false)}
                >
                  Reject
                </button>
              </div>
            </section>
          </div>
        )
      })
    )
  }


  return (
    <div className="admin-verification-wrapper page-wrapper">
      <h1>Verification Requests</h1>
      <p>
        Admins can sort through and accept or reject new users that have
        requested to be verified on the marketplace. If you need access to this
        page, please contact a site admin
      </p>
      <section className="requests-wrapper">
        {renderRequests()}

        {verificationRequests.length === 0 && 
          <span className="requests-notice">
            No Requests Available
          </span>
        }
      </section>
    </div>
  );
}