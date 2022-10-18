import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import FormInput from "../../components/FormInput";
import clientLog from "../../api/clientLog";
import { isValidObjectField, updateError } from "../../utils/method";
import { Month, ShippingType, Type } from "../../contains/constant";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const AddLog = ({ route }) => {
  const handleOnChangeText = (value, fieldName) => {
    setLogInfo({ ...logInfo, [fieldName]: value });
  };

  const [error, setError] = useState("");
  const [imageGallery, setImageGallery] = useState(null);

  //handle time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //handle time picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText(fDate, "valid");
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [logInfo, setLogInfo] = useState({
    name: "",
    month: "",
    freight: "",
    hsCode: "",
    function: "",
    image: "",
    pol: "",
    pod: "",
    typeProduct: "",
    quantity: "",
    requirement: "",
    price: "",
    type: "",
    policy: "",
    referencefee: "",
    note: "",
  });

  // console.log(logInfo);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImageGallery(result.uri);
    }
  };

  // console.log(image);

  const isValidForm = () => {
    if (!isValidObjectField(logInfo))
      return updateError("Nhập Thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientLog.post("/create", { ...logInfo });
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
      }
      console.log("running");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
    // }
  };

  // console.log("sssss",logInfo);

  return (
    <View style={StyleSheet.container}>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) => setLogInfo({ ...logInfo, month: value })}
            data={Month}
            // defaultOption={{key:logInfo.month, value:logInfo.month}}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Vận Chuyển</Text>
          <SelectList
            setSelected={(value) => setLogInfo({ ...logInfo, freight: value })}
            data={ShippingType}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Hình</Text>
          <SelectList
            setSelected={(value) => setLogInfo({ ...logInfo, type: value })}
            data={Type}
          />
        </View>
        <FormInput
          label="Name"
          placeholder="Name"
          onChangeText={(value) => handleOnChangeText(value, "name")}
          value={logInfo.name}
        />
        <FormInput
          label="H/S Code"
          placeholder="H/S Code"
          onChangeText={(value) => handleOnChangeText(value, "hsCode")}
          value={logInfo.hsCode}
        />
        <FormInput
          label="Công Dụng"
          placeholder="Công Dụng"
          onChangeText={(value) => handleOnChangeText(value, "function")}
          value={logInfo.function}
        />
        <FormInput
          placeholder="POL"
          label="POL"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={logInfo.pol}
        />
        <FormInput
          placeholder="POD"
          label="POD"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={logInfo.pod}
        />
        <FormInput
          placeholder="Loại Hàng"
          label="Loại Hàng"
          onChangeText={(value) => handleOnChangeText(value, "typeProduct")}
          value={logInfo.typeProduct}
        />
        <FormInput
          placeholder="Yêu Cầu Đặc Biệt"
          label="Yêu Cầu Đặc Biệt"
          onChangeText={(value) => handleOnChangeText(value, "requirement")}
          value={logInfo.requirement}
        />
        <FormInput
          placeholder="Giá"
          label="Giá"
          value={logInfo.price}
          onChangeText={(value) => handleOnChangeText(value, "price")}
        />
        <FormInput
          placeholder="Chính Sách"
          label="Chính Sách"
          value={logInfo.policy}
          onChangeText={(value) => handleOnChangeText(value, "policy")}
        />
        <FormInput
          placeholder="Phí TTHQ Tham Khảo"
          label="Phí TTHQ Tham Khảo"
          value={logInfo.referencefee}
          onChangeText={(value) => handleOnChangeText(value, "referencefee")}
        />
        <FormInput
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={logInfo.note}
          onChangeText={(value) => handleOnChangeText(value, "note")}
        />
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} style={[styles.buttonInsert]} /> */}
        <TouchableOpacity style={[styles.buttonImage]} onPress={pickImage}>
          <Icon
            name="image"
            size={30}
            color="black"
            style={{ position: "absolute", top: 12, left: 30 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Chọn hình ảnh</Text>
        </TouchableOpacity>
        {imageGallery && (
          <Image style={styles.styleImage} source={{ uri: imageGallery }} />
        )}
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Thêm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: color.colorbutton,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.background,
    marginLeft: height * 0.445,
  },
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  dropMenu: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    flex: 1,
    minWidth: 180,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonInsert: {
    height: 50,
    width: 150,
    borderColor: color.borderColor,
    borderWidth: 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 10,
  },
  buttonImage: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 40,
  },
  styleButton: {
    padding: 20,
    marginLeft: 50,
  },
  styleImage: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
});

export default AddLog;
