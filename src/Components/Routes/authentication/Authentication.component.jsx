import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../SignUpForm/SignUpForm.component";
import SignInForm from "../../SignInForm/SignInForm.component";
import "./Authentication.styles.scss";



const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
