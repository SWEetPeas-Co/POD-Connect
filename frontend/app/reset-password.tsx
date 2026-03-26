import { useState } from "react";
import { Pressable, TextInput, StyleSheet, } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useRouter, Link } from "expo-router";
import { resetPasswordIfExists } from "@/src/lib/auth";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ResetPassword(){
    const [email, setEmail] = useState("");
    const [message, setMessage]= useState("");
    const [error, setError] = useState(""); // stores errors
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    
    const router =  useRouter();
    async function handleReset(){
        try{
            await resetPasswordIfExists(email);
            setMessage("Password reset email sent!");
        } catch (err){
            setMessage(err instanceof Error ? err.message : "Something went wrong");
        }
    }
    return (
        <ThemedView style={[styles.loginContainer, { backgroundColor: theme.background } ]}>
              <ThemedText type='header' style={styles.title}>Password Reset</ThemedText>
        
              {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        
              <ThemedView style={styles.form}>
                <TextInput
                  style={[styles.input, { color: '#569170' }]}
                  placeholder="Enter your email"
                  placeholderTextColor="#98BA7B"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Pressable style={styles.button} onPress={handleReset}>
                          <ThemedText type='eventSubtitle' style={styles.buttonText}>RESET PASSWORD</ThemedText>
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
})