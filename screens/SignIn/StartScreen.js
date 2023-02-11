import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Nghiệp Vụ FBI LOGISTICS</Header>
      <Paragraph>Ứng dụng hỗ trợ thuộc công ty FBI LOGISTICS</Paragraph>
      <Pressable
        style={styles.btnSignIn}
        onPress={() => navigation.navigate("Đăng Nhập")}
      >
        <Text style={styles.txtSignIn}>Đăng Nhập</Text>
      </Pressable>
    </Background>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  btnSignIn: {
    width: 330,
    height: 48,
    backgroundColor: "#0176E4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  txtSignIn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
