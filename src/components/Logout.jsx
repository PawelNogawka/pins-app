import { GoogleLogout } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Logout = ({ dispatch }) => {
  const onSuccess = async (res) => {
    dispatch({ type: "LOGOUT" });
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onSuccess}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <button
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            {"wyloguj się"}
          </button>
        )}
      />
    </div>
  );
};

export default Logout;
