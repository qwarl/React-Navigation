import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { theme } from "../core/theme";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/whilebg.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 20,
    shadowRadius: 40,
    elevation: 30,
    width: "100%",
    maxWidth: 485,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
