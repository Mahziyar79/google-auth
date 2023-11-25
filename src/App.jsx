import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "247485287331-8uantukuvm1uippii1epnahc19fhud7v.apps.googleusercontent.com",
      callback: (response) => {
        const payload = jwtDecode(response.credential);
        console.log("Payload =>", payload);
        setUser(payload);
      },
    });

    google.accounts.id.renderButton(document.querySelector(".sign-in"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      {!user && (
        <div className="login-page">
          <div className="form">
            <form className="register-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
              <p className="message">
                Already registered? <a href="#">Sign In</a>
              </p>
            </form>
            <form className="login-form">
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
              <div className="sign-in"></div>
              <br />
              <button>login</button>
              <p className="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      )}

      {user && (
        <div>
          <img src={user.picture} alt="user profile" />
          <h2>Welcome, {user.name}</h2>
          <hr />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default App;
