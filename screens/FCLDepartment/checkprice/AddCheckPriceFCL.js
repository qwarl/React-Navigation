import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../contains/color";
import { Container, Continent, Month1 } from "../../../contains/constant";
import { Dropdown } from "react-native-element-dropdown";
import FormInput from "../../../components/FormInput";
import Icon from "react-native-vector-icons/FontAwesome";
import clientCheckPriceFCL from "../../../api/clientCheckPriceFCL";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddCheckPriceFCL = ({ navigation }) => {
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

  const handleOnChangeText = (value, fieldName) => {
    setFclInfo({ ...fclInfo, [fieldName]: value });
  };

  const addDate = () => {
    showMode("date");
  };
  const [fclInfo, setFclInfo] = useState({
    month: "",
    continent: "",
    type: "",
    pol: "",
    pod: "",
    carrier: "",
    of20: "",
    of40: "",
    of45: "",
    sur20: "",
    sur40: "",
    valid: "",
    lines: "",
    freeTime: "",
    notes: "",
  });
  // console.log("valid", fclInfo.valid);
  const submitForm = async () => {
    try {
      const res = await clientCheckPriceFCL.post("/create", { ...fclInfo });
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitUpdateForm = async () => {
    // if (isValidForm()) {

    const url = `http://'${ipAddress}'/api/quotations/update/${route.params._id}`;

    try {
      const res = await axios.post(url, { ...fclInfo });
      if (res.data.success) {
        Alert.alert("Cập nhật thành công");
      }
      // console.log("running");
      // console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
    // }
  };
  return (
    <View style={StyleSheet.container}>
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Month1}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={fclInfo.month}
            onChange={(value) => {
              setFclInfo({ ...fclInfo, month: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Continent}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={fclInfo.continent}
            onChange={(value) => {
              setFclInfo({ ...fclInfo, continent: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Container</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Container}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={fclInfo.type}
            onChange={(value) => {
              setFclInfo({ ...fclInfo, type: value.value });
            }}
          />
        </View>

        <FormInput
          label="HÃNG TÀU"
          placeholder="HÃNG TÀU"
          onChangeText={(value) => handleOnChangeText(value, "carrier")}
          value={fclInfo.carrier}
        />
        <FormInput
          label="POL"
          placeholder="pol"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={fclInfo.pol}
        />
        <FormInput
          label="POD"
          placeholder="pod"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={fclInfo.pod}
        />
        <FormInput
          label="O/F 20"
          placeholder="O/F 20"
          onChangeText={(value) => handleOnChangeText(value, "of20")}
          value={fclInfo.of20}
        />
        <FormInput
          placeholder="O/F 40"
          label="O/F 40"
          onChangeText={(value) => handleOnChangeText(value, "of40")}
          value={fclInfo.of40}
        />
        <FormInput
          placeholder="O/F 45"
          label="O/F 45"
          onChangeText={(value) => handleOnChangeText(value, "of45")}
          value={fclInfo.of45}
        />
        <FormInput
          placeholder="SUR 20"
          label="SUR 20"
          onChangeText={(value) => handleOnChangeText(value, "sur20")}
          value={fclInfo.sur20}
        />
        <FormInput
          placeholder="SUR 40"
          label="SUR 40"
          onChangeText={(value) => handleOnChangeText(value, "sur40")}
          value={fclInfo.sur40}
        />
        <FormInput
          placeholder="LINES"
          label="LINES"
          onChangeText={(value) => handleOnChangeText(value, "lines")}
          value={fclInfo.lines}
        />
        <FormInput
          placeholder="FREE TIME"
          label="FREE TIME"
          onChangeText={(value) => handleOnChangeText(value, "freeTime")}
          value={fclInfo.freeTime}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Valid</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="VALID"
              label="VALID"
              value={fclInfo.valid}
              onChangeText={(value) => handleOnChangeText(value, "valid")}
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
        <FormInput
          placeholder="NOTES"
          label="NOTES"
          onChangeText={(value) => handleOnChangeText(value, "notes")}
          value={fclInfo.notes}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.buttonInsert} onPress={submitForm}>
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

export default AddCheckPriceFCL;
