// Registration page that allows new users to create an account with email and password
// and redirects authenticated users to the main app tabs.
// TODO: Needs to be styled later

import React, { useState, useContext, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import AuthContext from "../src/lib/authContext/index";
import { doCreateUserWithEmailAndPassword } from "../src/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { userLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/(tabs)/my-events");
    }
  }, [userLoggedIn]);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      // AuthContext will update automatically
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create an Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <Link href="/">Log in</Link>
      </p>
    </div>
  );
}