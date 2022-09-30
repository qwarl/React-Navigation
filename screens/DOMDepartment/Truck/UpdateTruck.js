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
import SelectList from "react-native-dropdown-select-list";
import {
  Continent,
  Month,
  TypeContainerTruck,
  TypeTruck,
} from "../../../contains/constant";
import FormInput from "../../../components/FormInput";
import clientTruck from "../../../api/clientTruck";

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
        const res = await clientTruck.post(url+id, { ...truckInfo });
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
          <SelectList
            setSelected={(value) => setTruckInfo({ ...truckInfo, month: value })}
            data={Month}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) =>
              setTruckInfo({ ...truckInfo, continent: value })
            }
            data={Continent}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Xe Vận Chuyển</Text>
          <SelectList
            setSelected={(value) =>
              setTruckInfo({ ...truckInfo, typetruck: value })
            }
            data={TypeTruck}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Container</Text>
          <SelectList
            setSelected={(value) =>
              setTruckInfo({ ...truckInfo, container: value })
            }
            data={TypeContainerTruck}
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
            alignItems:'center',
            flexDirection:'row',
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
  )
}

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
    width:150,
    borderColor: color.borderColor,
    borderWidth:2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft:10,
  },
  buttonUpdate: {
    height: 50,
    width:150,
    borderColor: color.borderColor,
    borderWidth:2,
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

export default UpdateTruck