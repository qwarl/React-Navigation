import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import { ShippingType } from "../../contains/ShippingType";
import { Type } from "../../contains/Type";
import { Month } from "../../contains/month";
import FormInput from "../../components/FormInput";
import clientLog from "../../api/clientLog";

import { isValidObjectField, updateError } from "../../utils/method";

const UpdateLog = ({ route }) => {
  const [updateData, setUpdateData] = useState(route.params.data);
  const [open, setOpen] = useState(false);

  const handleOnChangeText = (value, fieldName) => {
    setUpdateData({ ...updateData, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjectField(updateData))
      return updateError("Required all fields!", setError);
    //only valid email id is allowed
    // if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // // password must have 8 or more characters
    // if (!password.trim() || password.length < 8)
    //   return updateError("Password is too short!", setError);
    return true;
  };


  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const url = "/update/";
        const id = updateData._id;
        const res = await clientLog.post(url+id, { ...updateData });
        if (res.data.success) {
          Alert.alert("Cập Nhật Thành Công");
        }
        console.log("running");
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  console.log("123", updateData.month);

  return (
    <View style={StyleSheet.container}>
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) =>
              setUpdateData({ ...updateData, month: value })
            }
            data={Month}
            defaultOption={{ key: updateData.month, value: updateData.month }}
          />
          {/* <DropDownPicker
            open={open}
            items={items}
            value={value}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Vận Chuyển</Text>
          <SelectList
            setSelected={(value) =>
              setUpdateData({ ...updateData, freight: value })
            }
            data={ShippingType}
            defaultOption={{
              key: updateData.freight,
              value: updateData.freight,
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Hình</Text>
          <SelectList
            setSelected={(value) =>
              setUpdateData({ ...updateData, type: value })
            }
            data={Type}
            defaultOption={{ key: updateData.type, value: updateData.type }}
          />
        </View>
        <FormInput
          label="Name"
          placeholder="Name"
          onChangeText={(value) => handleOnChangeText(value, "name")}
          value={updateData.name}
        />
        <FormInput
          label="H/S Code"
          placeholder="H/S Code"
          onChangeText={(value) => handleOnChangeText(value, "hsCode")}
          value={updateData.hsCode}
        />
        <FormInput
          label="Công Dụng"
          placeholder="Công Dụng"
          onChangeText={(value) => handleOnChangeText(value, "function")}
          value={updateData.function}
        />
        <FormInput
          placeholder="Hình Ảnh"
          label="Hình Ảnh"
          onChangeText={(value) => handleOnChangeText(value, "image")}
          value={updateData.image}
        />
        <FormInput
          placeholder="POL"
          label="POL"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={updateData.pol}
        />
        <FormInput
          placeholder="POD"
          label="POD"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={updateData.pod}
        />
        <FormInput
          placeholder="Loại Hàng"
          label="Loại Hàng"
          onChangeText={(value) => handleOnChangeText(value, "typeProduct")}
          value={updateData.typeProduct}
        />
        <FormInput
          placeholder="Số Lượng Cụ Thể"
          label="Số Lượng Cụ Thể"
          onChangeText={(value) => handleOnChangeText(value, "quantity")}
          value={updateData.quantity}
        />
        <FormInput
          placeholder="Yêu Cầu Đặc Biệt"
          label="Yêu Cầu Đặc Biệt"
          onChangeText={(value) => handleOnChangeText(value, "requirement")}
          value={updateData.requirement}
        />
        <FormInput
          placeholder="Giá"
          label="Giá"
          value={updateData.price}
          onChangeText={(value) => handleOnChangeText(value, "price")}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
            <Text style={{ fontSize: 18, color: "#fff" }}>Update</Text>
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
    backgroundColor: color.primary,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.background,
    position: "absolute",
    right: 10,
    marginBottom: 30,
    marginTop: 10,
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
    height: 45,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateLog;
