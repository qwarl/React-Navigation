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
import { Dropdown } from "react-native-element-dropdown";
import color from "../../../contains/color";
import { Continent, Month1, TypeImport } from "../../../contains/constant";
import FormInput from "../../../components/FormInput";
import clientImport from "../../../api/clientImport";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateImport = ({ route, navigation }) => {
  const [importInfo, setImportInfo] = useState(route.params.data);

  const handleOnChangeText = (fieldName, ...values) => {
    values.length === 1
      ? setImportInfo({ ...importInfo, [fieldName]: values[0] })
      : setImportInfo({
          ...importInfo,
          [fieldName]: values[0],
          totalfreight: values[1],
        });
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

    handleOnChangeText("valid", fDate);
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const plus = function (a = 0, b = 0) {
    const num1 = Number(a);
    const num2 = Number(b);
    return num1 + num2;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = importInfo._id;
      const res = await clientImport.post(url + id, { ...importInfo });
      if (res.data.success) {
        Alert.alert("Cập Nhật Thành Công");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const AddForm = async () => {
    // if (isValidForm()) {
    try {
      delete importInfo._id;
      const res = await clientImport.post("/create", { ...importInfo });
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
            value={importInfo.month}
            onChange={(value) => {
              setImportInfo({ ...importInfo, month: value.value });
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
            value={importInfo.continent}
            onChange={(value) => {
              setImportInfo({ ...importInfo, continent: value.value });
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
            data={TypeImport}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={importInfo.container}
            onChange={(value) => {
              setImportInfo({ ...importInfo, container: value.value });
            }}
          />
        </View>
        <FormInput
          label="Pol"
          placeholder="Pol"
          onChangeText={(value) => handleOnChangeText("pol", value)}
          value={importInfo.pol}
        />
        <FormInput
          placeholder="Pod"
          label="Pod"
          onChangeText={(value) => handleOnChangeText("pod", value)}
          value={importInfo.pod}
        />
        <FormInput
          label="OF 20"
          placeholder="OF 20"
          onChangeText={(value) => {
            handleOnChangeText("of20", value, plus(value, importInfo.sur20));
          }}
          value={importInfo.of20}
        />
        <FormInput
          label="OF 40"
          placeholder="OF 40"
          onChangeText={(value) => handleOnChangeText("of40", value)}
          value={importInfo.of40}
        />
        <FormInput
          placeholder="OF 45"
          label="OF 45"
          onChangeText={(value) => handleOnChangeText("of45", value)}
          value={importInfo.of45}
        />
        <FormInput
          placeholder="Sur 20"
          label="Sur 20"
          onChangeText={(value) => {
            handleOnChangeText("sur20", value, plus(value, importInfo.of20));
          }}
          value={importInfo.sur20}
        />
        <FormInput
          placeholder="Sur 40"
          label="Sur 40"
          onChangeText={(value) => handleOnChangeText("sur40", value)}
          value={importInfo.sur40}
        />
        <FormInput
          placeholder="Sur 45"
          label="Sur 45"
          value={importInfo.sur45}
          onChangeText={(value) => handleOnChangeText("sur45", value)}
        />
        <FormInput
          placeholder="Total Freight"
          label="Total Freight"
          value={`${Number(importInfo.sur20) + Number(importInfo.of20)}`}
        />
        <FormInput
          placeholder="Carrier"
          label="Carrier"
          value={importInfo.carrier}
          onChangeText={(value) => handleOnChangeText("carrier", value)}
        />
        <FormInput
          placeholder="Schedule"
          label="Schedule"
          value={importInfo.schedule}
          onChangeText={(value) => handleOnChangeText("schedule", value)}
        />
        <FormInput
          placeholder="Transittime"
          label="Transittime"
          value={importInfo.transittime}
          onChangeText={(value) => handleOnChangeText("transittime", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Valid</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="VALID"
              label="VALID"
              value={importInfo.valid}
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
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={importInfo.notes}
          onChangeText={(value) => handleOnChangeText("notes", value)}
        />
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

export default UpdateImport;
