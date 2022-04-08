import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import gradient from 'random-gradient';
import "./adminVerification.css";
import { useSnackbar } from "notistack";
import { REPORT_DATA, REQUEST_DATA } from "../../helpers/interfaces";
import { onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminVerification() {

  const [verificationRequests, setVerificationRequests] = useState<any[]>([]);
  const [userReports, setUserReports] = useState<any[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
    fetchReports();
  // eslint-disable-next-line
  }, []);

  onAuthStateChanged(auth, async (user) => {
    // setUser(currentUser);
    if (user) {
      // grab user's data
      // get db reference to current user
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // verify that the user can view the page
        if (docSnap.data().isAdmin && docSnap.data().isAdmin === true) {
          setUserIsAdmin(true);
        } else {
          navigate("/");
        }
      } 
    }
  });

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

  const fetchReports = async () => {
    let reports:any[] = [];
    // get all collections
    const collectionsRef = collection(db, "reports");
    const q = query(collectionsRef, where("reportId", "!=", ""))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // add to list
      if (doc.data())
        reports.push(doc.data());
    });
    setUserReports(reports);
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

  const renderReports = () => {
    return (
      userReports.map((report: REPORT_DATA) => {
        const count = Math.round(Math.random() * (500 - 0) + 0);
        const bgGradient = { background: gradient(count.toString()) };
        return (
          <div className="user-report">
            <section className="verification-request-image-wrapper" style={bgGradient}>
            </section>
            <section className="report-data">
              <div className="verification-request-section">
                Report ID: {report.reportId} 
              </div>
              <div className="verification-request-section">
                Submitter User ID: {report.submitter} 
              </div>
              <div className="verification-request-section">
                Reported User: {report.reportedUser} 
              </div>
              <div className="verification-request-section">
                Description: {report.reportDescription} 
              </div>
              <div className="verification-request-action-section">
                <button 
                  className="primary-button"
                  // onClick={() => buttonClicked(request, true)}
                >
                  Ignore
                </button>
                <button 
                  className="primary-button"
                  // onClick={() => buttonClicked(request, false)}
                >
                 Go to User 
                </button>
              </div>
            </section>
          </div>
        );
      })
    );
  }

  return (
    <div className="page-wrapper">
      <div className="admin-verification-wrapper">
        <h1>Verification Requests</h1>
        <p>
          Admins can sort through and accept or reject new users that have
          requested to be verified on the marketplace. If you need access to this
          page, please contact a site admin
        </p>
        <section className="requests-wrapper">
          {userIsAdmin && renderRequests()}
          {userIsAdmin && verificationRequests.length === 0 && 
            <span className="notice">
              No Requests Available
            </span>
          }
        </section>
      </div>
      <div className="admin-verification-wrapper">
        <h1>User Reports</h1>
        <p>
          Admins can sort through and manage any users that have been reported. 
        </p>
        <section className="reports-wrapper">
          {userIsAdmin && renderReports()}
          {userIsAdmin && verificationRequests.length === 0 && 
            <span className="notice">
              No Reports Available
            </span>
          }
        </section>
      </div>
    </div>
  );
}