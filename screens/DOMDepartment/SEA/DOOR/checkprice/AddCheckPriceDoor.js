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
import color from "../../../../../contains/color";
import { Dropdown } from "react-native-element-dropdown";
import {
  Continent,
  DomType,
  Month1,
  TypeSeaCY,
} from "../../../../../contains/constant";
import FormInput from "../../../../../components/FormInput";
import clientCheckPriceDoor from "../../../../../api/clientCheckPriceDoor";

const AddCheckPriceDoor = ({ navigation }) => {
  const [error, setError] = useState("");
  const [seaDoorInfo, setSeaDoorInfo] = useState({
    month: "",
    continent: "",
    container: "",
    productname: "",
    weight: "",
    quantitycont: "",
    etd: "",
    pol: "",
    pod: "",
    addresspacking: "",
    addressdelivery: "",
    doortype: "",
  });

  const handleOnChangeText = (value, fieldName) => {
    setSeaDoorInfo({ ...seaDoorInfo, [fieldName]: value });
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

  const isValidForm = () => {
    if (!isValidObjectField(seaDoorInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientCheckPriceDoor.post("/create", {
        ...seaDoorInfo,
      });
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
            value={seaDoorInfo.month}
            onChange={(value) => {
              setSeaDoorInfo({ ...seaDoorInfo, month: value.value });
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
            value={seaDoorInfo.continent}
            onChange={(value) => {
              setSeaDoorInfo({ ...seaDoorInfo, continent: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Container</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={TypeSeaCY}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={seaDoorInfo.container}
            onChange={(value) => {
              setSeaDoorInfo({ ...seaDoorInfo, container: value.value });
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
            data={DomType}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={seaDoorInfo.doortype}
            onChange={(value) => {
              setSeaDoorInfo({ ...seaDoorInfo, doortype: value.value });
            }}
          />
        </View>
        <FormInput
          label="Điểm Đi"
          placeholder="Điểm Đi"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={seaDoorInfo.pol}
        />
        <FormInput
          placeholder="Điểm Đến"
          label="Điểm Đến"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={seaDoorInfo.pod}
        />
        <FormInput
          label="Tên Hàng"
          placeholder="Tên Hàng"
          onChangeText={(value) => handleOnChangeText(value, "productname")}
          value={seaDoorInfo.productname}
        />
        <FormInput
          label="Trọng Lượng"
          placeholder="Trọng Lượng"
          onChangeText={(value) => handleOnChangeText(value, "weight")}
          value={seaDoorInfo.weight}
        />
        <FormInput
          placeholder="SL Cont"
          label="SL Cont"
          onChangeText={(value) => handleOnChangeText(value, "quantitycont")}
          value={seaDoorInfo.quantitycont}
        />
        <FormInput
          placeholder="ETD"
          label="ETD"
          onChangeText={(value) => handleOnChangeText(value, "etd")}
          value={seaDoorInfo.etd}
        />
        <FormInput
          placeholder="ĐC Đóng Hàng"
          label="ĐC Đóng Hàng"
          onChangeText={(value) => handleOnChangeText(value, "addresspacking")}
          value={seaDoorInfo.addresspacking}
        />
        <FormInput
          placeholder="ĐC Giao Hàng"
          label="ĐC Giao Hàng"
          onChangeText={(value) => handleOnChangeText(value, "addressdelivery")}
          value={seaDoorInfo.addressdelivery}
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

export default AddCheckPriceDoor;
