// Registration page that allows new users to create an account with email and password
// and redirects authenticated users to the main app tabs.
// TODO: Needs to be styled later

import React, { useState, useContext, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import AuthContext from "../src/lib/authContext/index";
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../src/lib/auth";
import { StyleSheet } from "react-native";
import PrimaryButton from "@/components/ui/primary-button";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ErrorMessage from "@/components/ui/error-msg";
import AuthInput from "@/components/auth/auth-input";
import AuthLayout from "@/components/auth/auth-container";
import { authStyles } from "@/components/auth/auth-form";

// This creates a register component
export default function RegisterPage() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

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
  }, [userLoggedIn, router]);

  // runs when the login form is submitted and checks if successful
  async function handleRegister() {
    setError("");

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      await doSendEmailVerification();
      router.replace("/verify-email");

      // AuthContext will update automatically
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    }
  }

  // old form
  // async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     await doCreateUserWithEmailAndPassword(email, password);
  //     // AuthContext will update automatically
  //   } catch (err) {
  //     if (err instanceof Error) setError(err.message);
  //   }
  // }

  return (

    <AuthLayout title="Create an Account">

      <ErrorMessage message={error} />

      <ThemedView style={authStyles.form}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AuthInput
          placeholder="Password (6+ characters)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PrimaryButton title="SIGN UP" onPress={handleRegister} />

      </ThemedView>

      <ThemedText type='eventSubtitle' style={authStyles.textSpacing}>
        Already have an account?{" "}
        <Link href="/" style={authStyles.link}>
          Log in
        </Link>
      </ThemedText>
    </AuthLayout>
  );
}

//     <ThemedView style={styles.container}>
//       <ThemedText style={styles.title}>Create an Account</ThemedText>

//       {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

//       <ThemedView style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password (6+ characters)"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <Pressable style={styles.button} onPress={handleRegister}>
//           <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
//         </Pressable>
//       </ThemedView>

//       <ThemedText style={styles.footer}>
//         Already have an account?{" "}
//         <Link href="/" style={styles.link}>
//           Log in
//         </Link>
//       </ThemedText>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     gap: 16,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//   },

//   form: {
//     gap: 12,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 8,
//   },

//   button: {
//     backgroundColor: "#000",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },

//   error: {
//     color: "red",
//   },

//   footer: {
//     marginTop: 20,
//   },

//   link: {
//     color: "blue",
//   },
// });

  
//     <div style={{ padding: 20 }}>
//       <h2>Create an Account</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password (6+ characters)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Sign Up</button>
//       </form>

//       <p style={{ marginTop: 20 }}>
//         Already have an account?{" "}
//         <Link href="/">Log in</Link>
//       </p>
//     </div>
//   );
// }