import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useRouter, Link } from "expo-router";
import { doSendEmailVerification } from "@/src/lib/auth";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PrimaryButton from "@/components/ui/primary-button";
import ErrorMessage from "@/components/ui/error-msg";
import AuthLayout from "@/components/auth/auth-container";
import { authStyles } from "@/components/auth/auth-form";

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
          <AuthLayout title="Verify Your Email">

            <ErrorMessage message={error} />
                
            <ThemedView style={authStyles.form}>
              
              <ThemedText type='eventTitle' style={authStyles.textSpacing}>
                We sent a verification link to your email.  
                Please verify your account before logging in.
              </ThemedText>
                      
              <PrimaryButton title="RESEND EMAIL" onPress={handleResend} />
                    
              {message ? <ThemedText>{message}</ThemedText> : null}
                    
              <ThemedText  type='eventSubtitle' style={authStyles.textSpacing}>
                <Link href="/" style={authStyles.link}>
                  Back to Login
                </Link>
              </ThemedText>

            </ThemedView>

          </AuthLayout> 

    );

}