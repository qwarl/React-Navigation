import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignIn = ({ navigation }) => {
  const [isShown, setIsShown] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.logo}>
        <Image
          style={styles.img}
          source={require("../../assets/LOGOFBI.png")}
        />
      </View>
      <View style={styles.signIn}>
        <View style={styles.lable}>
          <Text style={styles.txtLable}>Email</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="user"
            size={28}
            color="black"
            style={{
              marginLeft: 25,
              marginTop: 15,
              position: "absolute",
              zIndex: 1000,
            }}
          />
          <TextInput
            placeholder={"Nhập Email"}
            style={styles.input}
            placeholderTextColor={"black"}
          />
        </View>
        <View style={styles.lable}>
          <Text style={styles.txtLable}>Mật Khẩu</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="lock"
            size={28}
            color="black"
            style={{
              marginLeft: 25,
              marginTop: 15,
              position: "absolute",
              zIndex: 1000,
            }}
          />
          <TextInput
            placeholder={"placeholder"}
            style={styles.input}
            placeholderTextColor={"black"}
            secureTextEntry={visible}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
            setIsShown(!isShown);
          }}
        >
          <Ionicons
            name={isShown === false ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={28}
            color="black"
            style={styles.eye}
          />
        </TouchableOpacity>
        <Pressable style={styles.btnSignIn}>
          <Text style={styles.txtSignIn}>Đăng Nhập</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Đăng Ký");
          }}
        >
          <Text style={styles.textSignUP}>
            Chưa có tài khoản? <Text style={styles.txtSignUp}>Đăng Ký</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  logo: {
    alignItems: "center",
    height: 240,
    paddingTop: 50,
    backgroundColor: "#BFBFBF",
  },
  img: {
    width: 140,
    height: 140,
  },
  signIn: {
    backgroundColor: "#FFFFFF",
    marginTop: -20,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
  },
  input: {
    height: 35,
    fontSize: 17,
    padding: 10,
    marginBottom: 10,
    height: 55,
    marginLeft: 17,
    marginRight: 17,
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    paddingLeft: 40,
    width: "91%",
  },
  eye: {
    marginLeft: 25,
    marginTop: -50,
    position: "absolute",
    zIndex: 1000,
    right: 40,
  },
  btnSignIn: {
    marginTop: 30,
    width: 330,
    height: 48,
    backgroundColor: "#0176E4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtSignIn: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  lable: {
    marginLeft: 20,
    marginBottom: 5,
  },
  txtLable: {
    fontSize: 19,
    color: "black",
    fontWeight: "bold",
  },
  txtSignUp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0176E4",
  },
  textSignUP: {
    fontSize: 18,
    textAlign: "center",
    marginRight: 30,
    marginTop: 20,
  },
});
