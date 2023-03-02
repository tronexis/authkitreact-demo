import React from "react";
import axios from "axios";
import { useSignIn, useSignOut, useIsAuthenticated } from "react-auth-kit";

const SignInComponent = () => {
  const dummyData = {
    username: "kminchelle",
    password: "0lelplR",
  };

  const signIn = useSignIn();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const [formData, setFormData] = React.useState({ ...dummyData });

  const [user, setUser] = React.useState<any>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
        }
      }
    });
  };

  const handleSignOut = () => {
    setUser(null);
    signOut();
  };

  const inputStyle = `p-2 rounded-lg`;
  const copyableTextStyle = `hover:text-purple-300 cursor-pointer`;

  return (
    <>
      {!user && !isAuthenticated() ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <p
            className={copyableTextStyle}
            onClick={() => navigator.clipboard.writeText("kminchelle")}
          >
            Username: {dummyData.username}
          </p>
          <p
            className={copyableTextStyle}
            onClick={() => navigator.clipboard.writeText("0lelplR")}
          >
            Password: {dummyData.password}
          </p>
          <small className="italic text-zinc-500">
            click the username or password text above to copy them
          </small>
          <input
            type={"text"}
            className={inputStyle}
            placeholder="Enter Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type={"password"}
            className={inputStyle}
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button>Sign in</button>
        </form>
      ) : (
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg whitespace-pre-wrap break-words max-w-sm">
            {JSON.stringify(user)}
          </h2>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default SignInComponent;
