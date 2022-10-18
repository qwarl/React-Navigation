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
import color from "../../../../contains/color";
import {
  Continent,
  DomType,
  Month1,
  TypeSeaCY,
} from "../../../../contains/constant";
import clientSeaDoor from "../../../../api/clientSeaDoor";
import FormInput from "../../../../components/FormInput";

const UpdateDoor = ({ route }) => {
  const [seaDoorInfo, setSeaDoorInfo] = useState(route.params.data);
  const handleOnChangeText = (value, fieldName) => {
    setSeaDoorInfo({ ...seaDoorInfo, [fieldName]: value });
  };

  console.log(seaDoorInfo.month);
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = seaDoorInfo._id;
      const res = await clientSeaDoor.post(url + id, { ...seaDoorInfo });
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
      delete seaDoorInfo._id;
      const res = await clientSeaDoor.post("/create", { ...seaDoorInfo });
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
    <View style={{ backgroundColor: "white" }}>
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
          <Text style={styles.label}>Chọn Loại Hình Vận Chuyển</Text>
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
          onChangeText={(value) => handleOnChangeText(value, "aod")}
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
    marginVertical: 10,
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
export default UpdateDoor;
