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
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../../contains/color";
import { Continent, Month1, ShippingType } from "../../../contains/constant";
import { Dropdown } from "react-native-element-dropdown";
import clientCheckPriceAir from "../../../api/clientCheckPriceAir";

const AddCheckPriceAir = ({ navigation }) => {
  const handleOnChangeText = (value, fieldName) => {
    setAirInfo({ ...airInfo, [fieldName]: value });
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

    handleOnChangeText(fDate, "valid");
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [airInfo, setAirInfo] = useState({
    continent: "",
    month: "",
    shippingtype: "",
    dim: "",
    grossweight: "",
    aol: "",
    aod: "",
    typeofcargo: "",
    airfreight: "",
    sur: "",
    airlines: "",
    schedule: "",
    transittime: "",
    valid: "",
    note: "",
  });

  const isValidForm = () => {
    if (!isValidObjectField(airInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientCheckPriceAir.post("/create", { ...airInfo });
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
            value={airInfo.month}
            onChange={(value) => {
              setAirInfo({ ...airInfo, month: value.value });
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
            value={airInfo.continent}
            onChange={(value) => {
              setAirInfo({ ...airInfo, continent: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Vận Chuyển</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ShippingType}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={airInfo.shippingtype}
            onChange={(value) => {
              setAirInfo({ ...airInfo, shippingtype: value.value });
            }}
          />
        </View>
        <FormInput
          label="Aol"
          placeholder="Aol"
          onChangeText={(value) => handleOnChangeText(value, "aol")}
          value={airInfo.aol}
        />
        <FormInput
          placeholder="Aod"
          label="Aod"
          onChangeText={(value) => handleOnChangeText(value, "aod")}
          value={airInfo.aod}
        />
        <FormInput
          label="Dim"
          placeholder="Dim"
          onChangeText={(value) => handleOnChangeText(value, "dim")}
          value={airInfo.dim}
        />
        <FormInput
          label="Gross Weight"
          placeholder="Gross Weight"
          onChangeText={(value) => handleOnChangeText(value, "grossweight")}
          value={airInfo.grossweight}
        />
        <FormInput
          placeholder="Type Of Cargo"
          label="Type Of Cargo"
          onChangeText={(value) => handleOnChangeText(value, "typeofcargo")}
          value={airInfo.typeofcargo}
        />
        <FormInput
          placeholder="Air Freight"
          label="Air Freight"
          onChangeText={(value) => handleOnChangeText(value, "airfreight")}
          value={airInfo.airfreight}
        />
        <FormInput
          placeholder="Sur"
          label="Sur"
          onChangeText={(value) => handleOnChangeText(value, "sur")}
          value={airInfo.sur}
        />
        <FormInput
          placeholder="Air Lines"
          label="Air Lines"
          value={airInfo.airlines}
          onChangeText={(value) => handleOnChangeText(value, "airlines")}
        />
        <FormInput
          placeholder="Schedule"
          label="Schedule"
          value={airInfo.schedule}
          onChangeText={(value) => handleOnChangeText(value, "schedule")}
        />
        <FormInput
          placeholder="Transittime"
          label="Transittime"
          value={airInfo.transittime}
          onChangeText={(value) => handleOnChangeText(value, "transittime")}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Valid</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="VALID"
              label="VALID"
              value={airInfo.valid}
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
          value={airInfo.note}
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

export default AddCheckPriceAir;
