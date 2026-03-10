import React, {useState, useEffect} from "react";
import {doSignInWithEmailAndPassword} from "../src/lib/auth";
import { useContext } from "react";
import AuthContext from "../src/lib/authContext/index";
import {useRouter} from "expo-router";
import {Link} from "expo-router";

export default function LoginPage() {
  const { userLoggedIn } = useContext(AuthContext);
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [userLoggedIn]);
  async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      await doSignInWithEmailAndPassword(email, password);
      // userLoggedIn will update automatically from AuthContext
    } catch (err) {
      if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred");
        }
    }
  }
/*
  async function handleGoogleLogin() {
    setError("");

    try {
      await doSignInWithGoogle();
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred");
        }
    }
  }
*/
  if (userLoggedIn) {
    return <p>You are already logged in!</p>;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
      Don’t have an account? <Link href="/register">Sign up</Link>
      </p>
    </div>
  );
}