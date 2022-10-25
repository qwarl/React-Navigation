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
import { Dropdown } from "react-native-element-dropdown";
import FormInput from "../../../../components/FormInput";
import color from "../../../../contains/color";
import {
  Continent,
  Month1,
  TypeContainerTruck,
  TypeTruck,
} from "../../../../contains/constant";
import clientCheckPriceTruck from "../../../../api/clientCheckPriceTruck";
import clientTruck from "../../../../api/clientTruck";

const AddTruckRequiteSale = ({ navigation, route }) => {
  const handleOnChangeText = (value, fieldName) => {
    setTruckInfo({ ...truckInfo, [fieldName]: value });
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

  const [truckInfo, setTruckInfo] = useState(route.params.item);

  const isValidForm = () => {
    if (!isValidObjectField(truckInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/delete/";
      const id = truckInfo._id;
      const res1 = await clientCheckPriceTruck.delete(url + id);
      const res = await clientTruck.post("/create", { ...truckInfo });
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
            value={truckInfo.month}
            onChange={(value) => {
              setTruckInfo({ ...truckInfo, month: value.value });
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
            value={truckInfo.continent}
            onChange={(value) => {
              setTruckInfo({ ...truckInfo, continent: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Xe Vận Chuyển</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={TypeTruck}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={truckInfo.typetruck}
            onChange={(value) => {
              setTruckInfo({ ...truckInfo, typetruck: value.value });
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
            data={TypeContainerTruck}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={truckInfo.container}
            onChange={(value) => {
              setTruckInfo({ ...truckInfo, container: value.value });
            }}
          />
        </View>
        <FormInput
          label="Tên Hàng"
          placeholder="Tên Hàng"
          onChangeText={(value) => handleOnChangeText(value, "productname")}
          value={truckInfo.productname}
        />
        <FormInput
          placeholder="Trọng Lượng"
          label="Trọng Lượng"
          onChangeText={(value) => handleOnChangeText(value, "weight")}
          value={truckInfo.weight}
        />
        <FormInput
          label="SL Kiện"
          placeholder="SL Kiện"
          onChangeText={(value) => handleOnChangeText(value, "quantitypallet")}
          value={truckInfo.quantitypallet}
        />
        <FormInput
          label="SL Carton"
          placeholder="SL Carton"
          onChangeText={(value) => handleOnChangeText(value, "quantitycarton")}
          value={truckInfo.quantitycarton}
        />
        <FormInput
          placeholder="ĐC Lấy Hàng"
          label="ĐC Lấy Hàng"
          onChangeText={(value) => handleOnChangeText(value, "addressdelivery")}
          value={truckInfo.addressdelivery}
        />
        <FormInput
          placeholder="ĐC Nhận Hàng"
          label="ĐC Nhận Hàng"
          onChangeText={(value) => handleOnChangeText(value, "addressreceive")}
          value={truckInfo.addressreceive}
        />
        <FormInput
          placeholder="Chiều Dài"
          label="Chiều Dài"
          onChangeText={(value) => handleOnChangeText(value, "length")}
          value={truckInfo.length}
        />
        <FormInput
          placeholder="Chiều Cao"
          label="Chiều Cao"
          value={truckInfo.height}
          onChangeText={(value) => handleOnChangeText(value, "height")}
        />
        <FormInput
          placeholder="Chiều Rộng"
          label="Chiều Rộng"
          value={truckInfo.width}
          onChangeText={(value) => handleOnChangeText(value, "width")}
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

export default AddTruckRequiteSale;
