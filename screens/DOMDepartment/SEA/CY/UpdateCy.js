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
import SelectList from "react-native-dropdown-select-list";
import clientSeaCy from "../../../../api/clientSeaCy";
import { Continent, Month, TypeSeaCY } from "../../../../contains/constant";
import color from "../../../../contains/color";
import FormInput from "../../../../components/FormInput";

const UpdateCy = ({ route }) => {
  const [seaCyInfo, setSeaCyInfo] = useState(route.params.data);
  const handleOnChangeText = (value, fieldName) => {
    setSeaCyInfo({ ...seaCyInfo, [fieldName]: value });
  };
  
  console.log(seaCyInfo.month);
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const url = "/update/";
      const id = seaCyInfo._id;
      const res = await clientSeaCy.post(url + id, { ...seaCyInfo });
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
      delete seaCyInfo._id;
      const res = await clientSeaCy.post("/create", { ...seaCyInfo });
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
        <SelectList
          setSelected={(value) => setSeaCyInfo({ ...seaCyInfo, month: value })}
          data={Month}
          defaultOption={{ key: seaCyInfo.month, value: seaCyInfo.month }}
        />
      </View>
      <View style={styles.dropMenu}>
        <Text style={styles.label}>Chọn Châu</Text>
        <SelectList
          setSelected={(value) =>
            setSeaCyInfo({ ...seaCyInfo, continent: value })
          }
          data={Continent}
        />
      </View>
      <View style={styles.dropMenu}>
        <Text style={styles.label}>Chọn Container</Text>
        <SelectList
          setSelected={(value) =>
            setSeaCyInfo({ ...seaCyInfo, container: value })
          }
          data={TypeSeaCY}
        />
      </View>
      <FormInput
        label="Cảng Đi"
        placeholder="Cảng Đi"
        onChangeText={(value) => handleOnChangeText(value, "pol")}
        value={seaCyInfo.pol}
      />
      <FormInput
        placeholder="Cảng Đến"
        label="Cảng Đến"
        onChangeText={(value) => handleOnChangeText(value, "aod")}
        value={seaCyInfo.pod}
      />
      <FormInput
        label="Tên Hàng"
        placeholder="Tên Hàng"
        onChangeText={(value) => handleOnChangeText(value, "productname")}
        value={seaCyInfo.productname}
      />
      <FormInput
        label="Trọng Lượng"
        placeholder="Trọng Lượng"
        onChangeText={(value) => handleOnChangeText(value, "weight")}
        value={seaCyInfo.weight}
      />
      <FormInput
        placeholder="SL Cont"
        label="SL Cont"
        onChangeText={(value) => handleOnChangeText(value, "quantitycont")}
        value={seaCyInfo.quantitycont}
      />
      <FormInput
        placeholder="ETD"
        label="ETD"
        onChangeText={(value) => handleOnChangeText(value, "etd")}
        value={seaCyInfo.etd}
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
});

export default UpdateCy;
