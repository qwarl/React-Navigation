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
import clientLCL from "../../../api/clientLCL";
import color from "../../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import { Continent, Month } from "../../../contains/constant";
import FormInput from "../../../components/FormInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { isValidObjectField, updateError } from "../../../utils/method";
import Icon from "react-native-vector-icons/FontAwesome";

const AddLCL = () => {
  const handleOnChangeText = (value, fieldName) => {
    setLCLInfo({ ...lclInfo, [fieldName]: value });
  };

  const [lclInfo, setLCLInfo] = useState({
    continent: "",
    month: "",
    dim: "",
    grossweight: "",
    pol: "",
    pod: "",
    typeofcargo: "",
    oceanfreight: "",
    localcharge: "",
    carrier: "",
    schedule: "",
    transittime: "",
    valid: "",
    note: "",
  });

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

    handleOnChangeText(fDate, "valid");
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const isValidForm = () => {
    if (!isValidObjectField(lclInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    // if(lclInfo.pol === null)
    // return updateError("Nhập pol", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await clientLCL.post("/create", { ...lclInfo });
        if (res.data.success) {
          Alert.alert("Thêm Thành Công");
        }
        console.log("running");
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
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
            setSelected={(value) => setLCLInfo({ ...lclInfo, month: value })}
            data={Month}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) =>
              setLCLInfo({ ...lclInfo, continent: value })
            }
            data={Continent}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%", marginRight: 20 }}>
            <Text style={styles.textValid}>Valid</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="VALID"
              label="VALID"
              value={lclInfo.valid}
              onChangeText={(value) => handleOnChangeText(value, "valid")}
            />
          </View>
          <TouchableOpacity onPress={() => showMode("date")}>
            <Icon
              name="calendar"
              size={35}
              color="#7F7F7F"
              style={{
                top: 30,
                position: "absolute",
                right: 40,
                marginBottom: 0,
                zIndex: 1000,
              }}
            />
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

export default AddLCL;
