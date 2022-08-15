import { useState } from "react";
import "./index.css";

export default function Index(props) {
  const [Auth, setAuth] = useState(props.auth);
  const [Pseudo, setPseudo] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleModals = (e) => {
    if (e.target.id === "signIn") {
      setAuth(true);
    }

    if (e.target.id === "signUp") {
      setAuth(false);
    }
  };

  return (
    <div
      className={Auth ? "container" : "container right-panel-active"}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>

          <span>or use your email for registration</span>
          <input type="text" onChange={(e) => setPseudo(e.target.value)} placeholder="Pseudo"/>

          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit" type="submit">
            Inscription
          </button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>

          <span>or use your account</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button className="submit" type="submit">
            Connexion
          </button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn" onClick={handleModals}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={handleModals}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
