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
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormInput from "../../../components/FormInput";
import color from "../../../contains/color";
import Icon from "react-native-vector-icons/FontAwesome";
import clientAddItemAdvance from "../../../api/clientAddItemAdvance";

const AddAdvance = ({ navigation }) => {
  const handleOnChangeText = (value, fieldName) => {
    setAdvanceInfo({ ...advanceInfo, [fieldName]: value });
  };

  const [error, setError] = useState("");

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

    handleOnChangeText(fDate, "date");
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [advanceInfo, setAdvanceInfo] = useState({
    money: "",
    username: "",
    reason: "",
    status: "",
    date: "",
    userCreate: "Mr Thắng",
  });

  // console.log(advanceInfo);
  const isValidForm = () => {
    if (!isValidObjectField(advanceInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    try {
      const res = await clientAddItemAdvance.post("/create", {
        ...advanceInfo,
      });
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={StyleSheet.container}>
      <View style={{ marginTop: 100, alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 20,
            color: color.primary,
            fontWeight: "bold",
          }}
        >
          Thêm Tạm Ứng OPS
        </Text>
      </View>
      <ScrollView>
        <FormInput
          label="Số Tiền"
          placeholder="Số Tiền"
          onChangeText={(value) => handleOnChangeText(value, "money")}
          value={advanceInfo.money}
        />
        <FormInput
          placeholder="Người Ứng"
          label="Người Ứng"
          onChangeText={(value) => handleOnChangeText(value, "username")}
          value={advanceInfo.username}
        />
        <FormInput
          label="Lý Do Ứng"
          placeholder="Lí Do Ứng"
          onChangeText={(value) => handleOnChangeText(value, "reason")}
          value={advanceInfo.reason}
        />
        <FormInput
          label="Tình Trạng"
          placeholder="Tình Trạng"
          onChangeText={(value) => handleOnChangeText(value, "status")}
          value={advanceInfo.status}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Ứng</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Ngày Ứng"
              value={advanceInfo.date}
              onChangeText={(value) => handleOnChangeText(value, "date")}
            />
          </View>
          <Icon
            onPress={() => setShow(!show)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            desplay="default"
            onChange={onChange}
            style={{ width: 400 }}
          />
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
              style={{
                fontSize: 18,
                color: color.primary,
                fontWeight: "bold",
              }}
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  detail: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.primary,
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 2,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  label: {
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
    borderWidth: 1.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 10,
  },
  buttonTime: {
    height: 40,
    borderColor: color.colorbutton,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 80,
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  validStyle: {
    height: 35,
    width: "90%",
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    height: 50,
    marginLeft: 17,
    marginRight: 17,
    borderBottomWidth: 1,
  },
  textValid: {
    fontWeight: "bold",
    marginLeft: 17,
  },
});

export default AddAdvance;
