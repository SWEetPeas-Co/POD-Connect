import { ThemedText } from "@/components/themed-text";


type ErrorMessageProps = {
  message?: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return <ThemedText style={{ color: "#d73d3d" }}>{message}</ThemedText>;
}