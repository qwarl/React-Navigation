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
import color from "../../contains/color";
import SelectList from 'react-native-dropdown-select-list'
import FormInput from "../../components/FormInput";
import client from "../../api/client";
import DateTimePicker from "@react-native-community/datetimepicker";
import { isValidObjectField, updateError } from "../../utils/method";
import {
  Month,
  Month1,
  Continent,
  Type,
  Year1,
  Container,
} from "../../contains/constant";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateFCL = ({ route, navigation }) => {
  const [updateData, setUpdateData] = useState(route.params.data);
  const [open, setOpen] = useState(false);

  // const [value, setValue] = useState(null);

  // console.log("123", updateData);

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
    setUpdateData({ ...updateData, [fieldName]: value });
  };

  // const isValidForm = () => {
  //     if (!isValidObjectField(updateData))
  //         return updateError("Required all fields!", setError);
  //only valid email id is allowed
  // if (!isValidEmail(email)) return updateError("Invalid email!", setError);
  // password must have 8 or more characters
  // if (!password.trim() || password.length < 8)
  //   return updateError("Password is too short!", setError);
  //     return true;
  // };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = updateData._id;
      const res = await client.post(url + id, { ...updateData });
      if (res.data.success) {
        Alert.alert("Cập Nhật Thành Công");
        navigation.goBack();
      }
      // console.log("running");
      // console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
    // }
  };

  const AddForm = async () => {
    // if (isValidForm()) {
    try {
      delete updateData._id;
      const res = await client.post("/create", updateData);
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        navigation.goBack();
      }
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
            value={updateData.month}
            onChange={(value) => {
              setUpdateData({ ...updateData, month: value.value });
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
            value={updateData.continent}
            onChange={(value) => {
              setUpdateData({ ...updateData, continent: value.value });
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
            value={updateData.type}
            onChange={(value) => {
              setUpdateData({ ...updateData, type: value.value });
            }}
          />
        </View>
        <FormInput
          placeholder="HÃNG TÀU"
          label="HÃNG TÀU"
          onChangeText={(value) => handleOnChangeText(value, "carrier")}
          value={updateData.carrier}
        />
        <FormInput
          placeholder="POL"
          label="POL"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={updateData.pol}
        />
        <FormInput
          placeholder="POD"
          label="POD"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={updateData.pod}
        />
        <FormInput
          label="O/F 20"
          placeholder="O/F 20"
          onChangeText={(value) => handleOnChangeText(value, "of20")}
          value={updateData.of20}
        />
        <FormInput
          label="O/F 40"
          placeholder="O/F 40"
          onChangeText={(value) => handleOnChangeText(value, "of40")}
          value={updateData.of40}
        />
        <FormInput
          label="O/F 45"
          placeholder="O/F 45"
          onChangeText={(value) => handleOnChangeText(value, "of45")}
          value={updateData.of45}
        />
        <FormInput
          placeholder="SUR 20"
          label="SUR 20"
          onChangeText={(value) => handleOnChangeText(value, "sur20")}
          value={updateData.sur20}
        />
        <FormInput
          placeholder="SUR 40"
          label="SUR 40"
          onChangeText={(value) => handleOnChangeText(value, "sur40")}
          value={updateData.sur40}
        />
        <FormInput
          placeholder="LINES"
          label="LINES"
          onChangeText={(value) => handleOnChangeText(value, "lines")}
          value={updateData.lines}
        />
        <FormInput
          placeholder="FREE TIME"
          label="FREE TIME"
          onChangeText={(value) => handleOnChangeText(value, "freeTime")}
          value={updateData.freeTime}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Valid</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="VALID"
              label="VALID"
              value={updateData.valid}
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
          value={updateData.notes}
        />
        {/* <View
                    style={{
                        flex: 1,
                        marginVertical: 30,
                        marginHorizontal: 80,
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity style={styles.buttonInsert} onPress={submitForm}>
                        <Text style={{ fontSize: 18, color: "#fff" }}>Update</Text>
                    </TouchableOpacity>
                </View> */}
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={[styles.buttonUpdate]} onPress={submitForm}>
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Cập Nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonInsert]} onPress={AddForm}>
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

export default UpdateFCL;

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
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 10,
  },
  buttonUpdate: {
    height: 50,
    width: 150,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
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
