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
import FormInput from "../../../../components/FormInput";
import color from "../../../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import {
  Continent,
  DomType,
  Month,
  TypeSeaCY,
} from "../../../../contains/constant";
import clientSeaCy from "../../../../api/clientSeaCy";
import { isValidObjectField, updateError } from "../../../../utils/method";

const AddCy = ({ navigation }) => {
  const [error, setError] = useState("");
  const [seaCyInfo, setSeaCyInfo] = useState({
    month: "",
    continent: "",
    container: "",
    productname: "",
    weight: "",
    quantitycont: "",
    etd: "",
    pol: "",
    pod: "",
    cytype: "",
  });

  const handleOnChangeText = (value, fieldName) => {
    setSeaCyInfo({ ...seaCyInfo, [fieldName]: value });
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
    if (!isValidObjectField(seaCyInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await clientSeaCy.post("/create", { ...seaCyInfo });
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
            setSelected={(value) =>
              setSeaCyInfo({ ...seaCyInfo, month: value })
            }
            data={Month}
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
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Hình Vận Chuyển</Text>
          <SelectList
            setSelected={(value) =>
              setSeaCyInfo({ ...seaCyInfo, cytype: value })
            }
            data={DomType}
          />
        </View>
        <FormInput
          label="Điểm Đi"
          placeholder="Điểm Đi"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={seaCyInfo.pol}
        />
        <FormInput
          placeholder="Điểm Đến"
          label="Điểm Đến"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
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
    borderWidth: 3,
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
});

export default AddCy;
