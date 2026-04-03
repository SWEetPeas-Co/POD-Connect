// This is the text input used for login screens

import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { KeyboardTypeOptions } from "react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// type AuthInputProps = {
//   placeholder: string
//   value: string
//   onChangeText: (text: string) => void
//   secureTextEntry?: boolean
//   keyboardType?: KeyboardTypeOptions
// }

type AuthInputProps = TextInputProps

export default function AuthInput({
  style,
  ...props
}: AuthInputProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  return (
    <TextInput
      style={[ styles.input, 
        { borderColor: theme.eventCardBackground, backgroundColor: theme.searchBarBackground, color: theme.eventCardText, },
        style
      ]}
      placeholderTextColor={theme.searchBarText}
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderRadius: 10,
    padding: 12,
  },
});