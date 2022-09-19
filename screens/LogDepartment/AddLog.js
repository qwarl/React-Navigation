import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import FormInput from "../../components/FormInput";
import clientLog from "../../api/clientLog";
import { isValidObjectField, updateError } from "../../utils/method";
import { Month, ShippingType, Type } from "../../contains/constant";

const { width, height } = Dimensions.get("window");

const AddLog = ({ route }) => {
  const handleOnChangeText = (value, fieldName) => {
    setLogInfo({ ...logInfo, [fieldName]: value });
  };

  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState("Empty");

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
      tempDate.getFullYear() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes();
    let fTime =
      "Hours: " + tempDate.getHours() + "| Minutes: " + tempDate.getMinutes();
    setValid(fDate);
    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const addDate = () => {
    showMode("date");
  };
  const [logInfo, setLogInfo] = useState({
    id:"",
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
    policy:"",
    note:"",
  });

  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  const code = "BGLOG"+day+month+
//   const getCurrentDate=()=>{
 
//       
//       var year = new Date().getFullYear();
 
//       return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
// }
 

  const isValidForm = () => {
    if (!isValidObjectField(logInfo))
      return updateError("Required all fields!", setError);
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
          placeholder="Hình Ảnh"
          label="Hình Ảnh"
          onChangeText={(value) => handleOnChangeText(value, "image")}
          value={logInfo.image}
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
          placeholder="Số Lượng Cụ Thể"
          label="Số Lượng Cụ Thể"
          onChangeText={(value) => handleOnChangeText(value, "quantity")}
          value={logInfo.quantity}
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
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={logInfo.note}
          onChangeText={(value) => handleOnChangeText(value, "note")}
        />


        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
            <Text style={{ fontSize: 18, color: "#fff" }}>Insert</Text>
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
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});

export default AddLog;
