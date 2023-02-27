import React from "react";
import axios from "axios";
import { useSignIn, useSignOut, useIsAuthenticated } from "react-auth-kit";

const SignInComponent = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [user, setUser] = React.useState<any>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post("https://dummyjson.com/auth/login", formData).then((res) => {
      if (res.status === 200) {
        if (
          signIn({
            token: res.data.token,
            expiresIn: 600,
            tokenType: "Bearer",
            // authState: res.data.authUserState,
            // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
            // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something
          setUser(res.data);
          console.log(res.data);
        } else {
          //Throw error
          console.log(res.data);
        }
      }
    });
  };

  const handleSignOut = () => {
    setUser(null);
    signOut();
  };

  return (
    <>
      {!user && !isAuthenticated() ? (
        <form onSubmit={onSubmit} className="flex flex-col space-y-3">
          <p onClick={() => navigator.clipboard.writeText("kminchelle")}>
            username: kminchelle
          </p>
          <p onClick={() => navigator.clipboard.writeText("0lelplR")}>
            password: 0lelplR
          </p>
          <small>click the username or password text above to copy them</small>
          <input
            type={"text"}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type={"password"}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button>Submit</button>
        </form>
      ) : (
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg whitespace-pre-wrap break-words">
            {JSON.stringify(user)}
          </h2>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default SignInComponent;
