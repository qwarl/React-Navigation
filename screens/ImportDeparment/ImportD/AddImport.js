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
import SelectList from 'react-native-dropdown-select-list'
import { Continent, Month1, TypeImport } from "../../../contains/constant";
import FormInput from "../../../components/FormInput";
import color from "../../../contains/color";
import { isValidObjectField, updateError } from "../../../utils/method";
import clientImport from "../../../api/clientImport";
import Icon from "react-native-vector-icons/FontAwesome";

const AddImport = ({ navigation }) => {
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

  const [importInfo, setImportInfo] = useState({
    pol: "",
    pod: "",
    month: "",
    continent: "",
    container: "",
    of20: "",
    of40: "",
    of45: "",
    sur20: "",
    sur40: "",
    sur45: "",
    totalfreight: "",
    carrier: "",
    schedule: "",
    transittime: "",
    valid: "",
    notes: "",
  });

  // console.log(importInfo);
  const isValidForm = () => {
    if (!isValidObjectField(importInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
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
              setImportInfo({ ...importInfo, month: value })
            }
            data={Month1}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) =>
              setImportInfo({ ...importInfo, continent: value })
            }
            data={Continent}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Container</Text>
          <SelectList
            setSelected={(value) =>
              setImportInfo({ ...importInfo, container: value })
            }
            data={TypeImport}
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
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChangeText("of20", value, plus(value, importInfo.sur20));
          }}
          value={importInfo.of20}
        />
        <FormInput
          label="OF 40"
          placeholder="OF 40"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeText("of40", value)}
          value={importInfo.of40}
        />
        <FormInput
          placeholder="OF 45"
          label="OF 45"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeText("of45", value)}
          value={importInfo.of45}
        />
        <FormInput
          placeholder="Sur 20"
          label="Sur 20"
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChangeText("sur20", value, plus(value, importInfo.of20));
          }}
          value={importInfo.sur20}
        />
        <FormInput
          placeholder="Sur 40"
          label="Sur 40"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeText("sur40", value)}
          value={importInfo.sur40}
        />
        <FormInput
          placeholder="Sur 45"
          label="Sur 45"
          keyboardType="numeric"
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

export default AddImport;
