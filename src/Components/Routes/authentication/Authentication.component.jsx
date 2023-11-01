import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../SignUpForm/SignUpForm.component";
import SignInForm from "../../SignInForm/SignInForm.component";
import { AuthenticationContainer }from "./Authentication.styles";



const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};
export default Authentication;
