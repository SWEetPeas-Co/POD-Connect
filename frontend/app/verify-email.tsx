import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useRouter, Link } from "expo-router";
import { doSendEmailVerification } from "@/src/lib/auth";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function VerifyEmail(){
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [error, setError] = useState(""); // stores errors
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    async function handleResend() {
        try {
        await doSendEmailVerification();
        setMessage("Verification email sent!");
        } catch (err) {
        setMessage(err instanceof Error ? err.message : "Something went wrong");
        }
    }
    return (
        <ThemedView style={[styles.loginContainer, { backgroundColor: theme.background } ]}>
            <ThemedText type='header' style={styles.title}>Verify Your Email</ThemedText>
                
                {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
                
                      <ThemedView style={styles.form}>
                        <ThemedText type='eventTitle' style={styles.signupText}>
                            We sent a verification link to your email.  
                            Please verify your account before logging in.
                        </ThemedText>
                        <Pressable style={styles.button} onPress={handleResend}>
                                  <ThemedText type='eventSubtitle' style={styles.buttonText}>RESEND EMAIL </ThemedText>
                        </Pressable>
                        {message ? <ThemedText>{message}</ThemedText> : null}
                        <ThemedText  type='eventSubtitle' style={styles.signupText}>
                            <Link href="/" style={styles.signupLink}>
                                Back to Login
                            </Link>
                        </ThemedText>
                        </ThemedView>
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
})