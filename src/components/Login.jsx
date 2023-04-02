import { GoogleLogin } from "react-google-login";
import { useLogin } from "../hooks/useLogin";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const { login, error, isLoading } = useLogin();

  const onSuccess = async (res) => {
    await login(
      res.profileObj.name,
      res.profileObj.email,
      res.profileObj.imageUrl,
      res.profileObj.googleId
    );
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <button
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            {isLoading ? "ładowanie..." : "zaloguj się"}
          </button>
        )}
      />
    </div>
  );
};

export default Login;
