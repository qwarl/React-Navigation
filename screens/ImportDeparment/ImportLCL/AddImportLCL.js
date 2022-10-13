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
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import color from "../../../contains/color";
import { Cargo, Continent, Month1 } from "../../../contains/constant";
import FormInput from "../../../components/FormInput";
import clientImportLCL from "../../../api/clientImportLCL";

const AddImportLCL = () => {
  const handleOnChangeText = (fieldName, ...values) => {
    values.length === 1
      ? setImportLCLInfo({ ...importLCLInfo, [fieldName]: values[0] })
      : setImportLCLInfo({
          ...importLCLInfo,
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

  const [importLCLInfo, setImportLCLInfo] = useState({
    pol: "",
    pod: "",
    month: "",
    continent: "",
    cargo: "",
    of: "",
    localpol: "",
    localpod: "",
    term: "",
    carrier: "",
    schedule: "",
    transittime: "",
    valid: "",
    notes: "",
  });

  // console.log(importLCLInfo);
  const isValidForm = () => {
    if (!isValidObjectField(importLCLInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientImportLCL.post("/create", { ...importLCLInfo });
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
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) =>
              setImportLCLInfo({ ...importLCLInfo, month: value })
            }
            data={Month1}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) =>
              setImportLCLInfo({ ...importLCLInfo, continent: value })
            }
            data={Continent}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Cargo</Text>
          <SelectList
            setSelected={(value) =>
              setImportLCLInfo({ ...importLCLInfo, cargo: value })
            }
            data={Cargo}
          />
        </View>
        <FormInput
          label="Pol"
          placeholder="Pol"
          onChangeText={(value) => handleOnChangeText("pol", value)}
          value={importLCLInfo.pol}
        />
        <FormInput
          placeholder="Pod"
          label="Pod"
          onChangeText={(value) => handleOnChangeText("pod", value)}
          value={importLCLInfo.pod}
        />
        <FormInput
          label="OF"
          placeholder="OF"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeText("of", value)}
          value={importLCLInfo.of}
        />
        <FormInput
          label="Term"
          placeholder="Term"
          onChangeText={(value) => handleOnChangeText("term", value)}
          value={importLCLInfo.term}
        />
        <FormInput
          placeholder="Local_Pol"
          label="Local_Pol"
          onChangeText={(value) => handleOnChangeText("localpol", value)}
          value={importLCLInfo.localpol}
        />
        <FormInput
          placeholder="Local_Pod"
          label="Local_Pod"
          onChangeText={(value) => handleOnChangeText("localpod", value)}
          value={importLCLInfo.localpod}
        />
        <FormInput
          placeholder="Carrier"
          label="Carrier"
          value={importLCLInfo.carrier}
          onChangeText={(value) => handleOnChangeText("carrier", value)}
        />
        <FormInput
          placeholder="Schedule"
          label="Schedule"
          value={importLCLInfo.schedule}
          onChangeText={(value) => handleOnChangeText("schedule", value)}
        />
        <FormInput
          placeholder="Transittime"
          label="Transittime"
          value={importLCLInfo.transittime}
          onChangeText={(value) => handleOnChangeText("transittime", value)}
        />
        <FormInput
          placeholder="VALID"
          label="VALID"
          value={importLCLInfo.valid}
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
          value={importLCLInfo.notes}
          onChangeText={(value) => handleOnChangeText("notes", value)}
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
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
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
    width: 150,
    borderColor: color.borderColor,
    borderWidth: 3,
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
});

export default AddImportLCL;