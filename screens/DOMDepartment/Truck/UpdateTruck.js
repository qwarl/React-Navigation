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
import clientTruck from "../../../api/clientTruck";
import { Dropdown } from "react-native-element-dropdown";
import {
  Continent,
  Month1,
  TypeContainerTruck,
  TypeTruck,
} from "../../../contains/constant";
const UpdateTruck = ({ route }) => {
  const [truckInfo, setTruckInfo] = useState(route.params.data);
  const handleOnChangeText = (value, fieldName) => {
    setTruckInfo({ ...truckInfo, [fieldName]: value });
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = truckInfo._id;
      const res = await clientTruck.post(url + id, { ...truckInfo });
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
      delete truckInfo._id;
      const res = await clientTruck.post("/create", { ...truckInfo });
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
          flexDirection: "row",
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
});

export default UpdateTruck;
