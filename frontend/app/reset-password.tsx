import { useState } from "react";
import { StyleSheet, } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useRouter, Link } from "expo-router";
import { resetPasswordIfExists } from "@/src/lib/auth";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PrimaryButton from "@/components/ui/primary-button";
import ErrorMessage from "@/components/ui/error-msg";
import AuthInput from "@/components/auth/auth-input";
import AuthLayout from "@/components/auth/auth-container";
import { authStyles } from "@/components/auth/auth-form";

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
        <AuthLayout title="Password Reset">
        
              <ErrorMessage message={error} />
        
              <ThemedView style={authStyles.form}>
                
                <AuthInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                
                <PrimaryButton title="RESET PASSWORD" onPress={handleReset} />
                
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