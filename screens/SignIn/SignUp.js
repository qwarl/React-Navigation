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
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignUp = () => {
  const [isShown, setIsShown] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.logo}></View>
      <View style={styles.signUp}>
        <View style={styles.lable}>
          <Text style={styles.txtLable}>Tên</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="drive-file-rename-outline"
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
            placeholder={"Nhập Tên"}
            style={styles.input}
            placeholderTextColor={"black"}
          />
        </View>
        <View style={styles.lable}>
          <Text style={styles.txtLable}>Phòng Ban</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="warehouse"
            size={28}
            color="black"
            style={{
              marginLeft: 25,
              marginTop: 13,
              position: "absolute",
              zIndex: 1000,
            }}
          />
          <TextInput
            placeholder={"Nhập Tên Phòng Ban"}
            style={styles.input}
            placeholderTextColor={"black"}
          />
        </View>
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
            placeholder={"Nhập Mật Khẩu"}
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
        <View style={styles.lable}>
          <Text style={styles.txtLable}>Nhập Lại Mật Khẩu</Text>
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
            placeholder={"Nhập Lại Mật Khẩu"}
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
          <Text style={styles.txtSignIn}>Đăng Ký</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  logo: {
    alignItems: "center",
    height: 90,
    paddingTop: 50,
    backgroundColor: "#BFBFBF",
  },
  signUp: {
    backgroundColor: "#FFFFFF",
    marginTop: -20,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
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
    fontSize: 16,
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
