// Login page component that allows users to sign in with email and password,
// handles authentication errors,
// and redirects authenticated users to the main app tabs.
// TODO: Needs to be styled later

import React, {useState, useEffect, useContext} from "react";
import {doSignInWithEmailAndPassword} from "../src/lib/auth"; // custom function that actually performs login.
import AuthContext from "../src/lib/authContext/index";
import {useRouter, Link} from "expo-router";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// LoginPage component
export default function LoginPage() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { userLoggedIn } = useContext(AuthContext); // true = user currently logged in, false = user not logged in
  const router = useRouter(); // Creates a router object used to navigate pages
  const [email, setEmail] = useState(""); // email typed in
  const [password, setPassword] = useState(""); // password typed in
  const [error, setError] = useState(""); // stores errors

  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/(tabs)/my-events"); // Replace current page
    }
  }, [userLoggedIn, router]); // uns code after the component renders whenever userLoggedIn changes
  
  // runs when the login form is submitted and checks if successful
  async function handleEmailLogin() {
    setError("");

    try {
      const user= await doSignInWithEmailAndPassword(email, password);
      if(!user.emailVerified){
        router.replace("/verify-email");
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }
  // old function if using html
  // async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault(); // stops reloading page
  //   setError(""); // clear errors

  //   try {
  //     await doSignInWithEmailAndPassword(email, password);
  //     // userLoggedIn will update automatically from AuthContext
  //   } catch (err) {
  //     if (err instanceof Error) {
  //           setError(err.message);
  //       } else {
  //           setError("An unexpected error occurred");
  //       }
  //   }
  // }

  // Sign in with Google option
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

  

  // start frontending
  return (

    <ThemedView style={[styles.loginContainer, { backgroundColor: theme.background } ]}>
      <ThemedText type='header' style={styles.title}>LOGIN</ThemedText>

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

      <ThemedView style={styles.form}>
        <TextInput
          style={[styles.input, { color: '#569170' }]}
          placeholder="Email"
          placeholderTextColor="#98BA7B"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, { color: '#569170' }]}
          placeholder="Password"
          placeholderTextColor="#98BA7B"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleEmailLogin}>
          <ThemedText type='eventSubtitle' style={styles.buttonText}>SIGN IN</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedText  type='eventSubtitle' style={styles.signupText}>
        Don’t have an account?{" "}
        <Link href="/register" style={styles.signupLink}>
          Sign up
        </Link>
      </ThemedText>
      <ThemedText  type='eventSubtitle' style={styles.signupText}>
        Forgot your password?{" "}
        <Link href="/reset-password" style={styles.signupLink}>
          Reset here
        </Link>
      </ThemedText>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },

  title: {
    width: '100%',
    fontSize: 28,
    fontWeight: "500",
    justifyContent: "center",
    alignContent: 'center',
  },

  error: {
    color: '#d73d3d',
  },

  form: {
    gap: 15,
    backgroundColor: 'transparent',
  },

  input: {
    borderWidth: 3,
    borderColor: '#D4CEAB',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },

  button: {
    backgroundColor: "#4A7E61",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
  },

  signupText: {
    marginTop: 13,
  },

  signupLink: {
    color: '#0d311d',
  },
});

//     <div className="login-container">
//       <h2>Login</h2>

//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleEmailLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Sign In</button>
//       </form>

//       <p>
//       Don’t have an account? <Link href="/register">Sign up</Link>
//       </p>
//     </div>
//   );
// }