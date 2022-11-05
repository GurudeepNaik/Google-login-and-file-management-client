import React,{useEffect} from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useAPI } from "../context/Context";

const Login = () => {
  const { registerUser } = useAPI();
  const myClientId ="336704564784-rseegpft0pqol5ijssnq8uupp6i6tk84.apps.googleusercontent.com";
  const onLoginSuccess = (res) => {
    localStorage.setItem("email", res.profileObj.email);
    localStorage.setItem("name", res.profileObj.name);
    localStorage.setItem("image", res.profileObj.imageUrl);
    registerUser();
  };

  const onLoginFailure = (res) => {
    console.log(`Login Failure: `, res);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div>
    <h1>Please Sign In With Google Account</h1>
      <GoogleLogin className="g-signin" clientId={myClientId} buttonText="Login" onSuccess={onLoginSuccess} onFailure={onLoginFailure} cookiePolicy={"single_host_origin"}/>
    </div>
  );
};

export default Login;
