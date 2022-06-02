import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

const SignInWithGoogleButton = () => {
  return <GoogleButton onClick={() => signIn("google")} />;
};

export default SignInWithGoogleButton;
