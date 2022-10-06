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
import React, { useEffect, useState } from "react";
import color from "../../../contains/color";
import FormInput from "../../../components/FormInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import clientLCL from "../../../api/clientLCL";
import { Dropdown } from "react-native-element-dropdown";
import { Continent, Month1 } from "../../../contains/constant";

const UpdateLCL = ({ route }) => {
  const [lclInfo, setLCLInfo] = useState(route.params.data);
  const handleOnChangeText = (value, fieldName) => {
    setLCLInfo({ ...lclInfo, [fieldName]: value });
  };

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

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = lclInfo._id;
      const res = await clientLCL.post(url + id, { ...lclInfo });
      if (res.data.success) {
        Alert.alert("Cập Nhật Thành Công");
      }
      console.log("running");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const AddForm = async () => {
    // if (isValidForm()) {
    try {
      delete lclInfo._id;
      const res = await clientLCL.post("/create", { ...lclInfo });
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
            value={lclInfo.month}
            onChange={(value) => {
              setLCLInfo({ ...lclInfo, month: value.value });
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
            value={lclInfo.continent}
            onChange={(value) => {
              setLCLInfo({ ...lclInfo, continent: value.value });
            }}
          />
        </View>
        <FormInput
          label="Pol"
          placeholder="Pol"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={lclInfo.pol}
        />
        <FormInput
          placeholder="Pod"
          label="Pod"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={lclInfo.pod}
        />
        <FormInput
          label="Dim"
          placeholder="Dim"
          onChangeText={(value) => handleOnChangeText(value, "dim")}
          value={lclInfo.dim}
        />
        <FormInput
          label="Gross Weight"
          placeholder="Gross Weight"
          onChangeText={(value) => handleOnChangeText(value, "grossweight")}
          value={lclInfo.grossweight}
        />
        <FormInput
          placeholder="Type Of Cargo"
          label="Type Of Cargo"
          onChangeText={(value) => handleOnChangeText(value, "typeofcargo")}
          value={lclInfo.typeofcargo}
        />
        <FormInput
          placeholder="Ocean Freight"
          label="Ocean Freight"
          onChangeText={(value) => handleOnChangeText(value, "oceanfreight")}
          value={lclInfo.oceanfreight}
        />
        <FormInput
          placeholder="Local Charge"
          label="Local Charge"
          onChangeText={(value) => handleOnChangeText(value, "localcharge")}
          value={lclInfo.localcharge}
        />
        <FormInput
          placeholder="Carrier"
          label="Carrier"
          value={lclInfo.carrier}
          onChangeText={(value) => handleOnChangeText(value, "carrier")}
        />
        <FormInput
          placeholder="Schedule"
          label="Schedule"
          value={lclInfo.schedule}
          onChangeText={(value) => handleOnChangeText(value, "schedule")}
        />
        <FormInput
          placeholder="Transit Time"
          label="Transit Time"
          value={lclInfo.transittime}
          onChangeText={(value) => handleOnChangeText(value, "transittime")}
        />
        <FormInput
          placeholder="Valid"
          label="Valid"
          value={lclInfo.valid}
          onChangeText={(value) => handleOnChangeText(value, "valid")}
        />
        <View>
          <TouchableOpacity
            style={[styles.buttonTime]}
            onPress={() => showMode("date")}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>Chọn Ngày</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              desplay="default"
              onChange={onChange}
            />
          )}
        </View>
        <FormInput
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={lclInfo.note}
          onChangeText={(value) => handleOnChangeText(value, "note")}
        />
          <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
            alignItems:'center',
            flexDirection:'row',
          }}
        >
          <TouchableOpacity style={[styles.buttonUpdate]} onPress={submitForm}>
            <Text style={{ fontSize: 18, color: "black" }}>Cập Nhật</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonInsert]} onPress={AddForm}>
            <Text style={{ fontSize: 18, color: "black" }}>Thêm</Text>
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
    width:150,
    borderColor: color.borderColor,
    borderWidth:3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft:10,
  },
  buttonUpdate: {
    height: 50,
    width:150,
    borderColor: color.borderColor,
    borderWidth:3,
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
});

export default UpdateLCL;
