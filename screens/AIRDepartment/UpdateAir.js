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
import { Continent, Month } from "../../contains/constant";
import { isValidObjectField, updateError } from "../../utils/method";
import clientAir from "../../api/clientAir";
import SelectList from "react-native-dropdown-select-list";
import FormInput from "../../components/FormInput";
import color from "../../contains/color";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateAir = ({ route }) => {
  const [airInfo, setAirInfo] = useState(route.params.data);
  const handleOnChangeText = (value, fieldName) => {
    setAirInfo({ ...airInfo, [fieldName]: value });
  };

  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    // setShow(Platform.OS === 'ios');
    // if (mode == 'date') {
    //   const currentDate = selectedDate || new Date();
    //   setDate(currentDate);
    // }
  };

  useEffect(() => {
    setAirInfo((prev) => {
      return { ...prev, valid: date };
    });
  }, [date]);

  const showMode = (currentMode) => {
    // if (Platform.OS === 'ios') {
    setShow(true);
    // for iOS, add a button that closes the picker
    // }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  
  const submitForm = async () => {
    // if (isValidForm()) {
      try {
        const url = "/update/";
        const id = airInfo._id;
        const res = await clientAir.post(url+id, { ...airInfo });
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
      const res = await clientAir.post("/create", { ...airInfo });
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
    <View style={StyleSheet.container}>
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) => setAirInfo({ ...airInfo, month: value })}
            data={Month}
            // defaultOption={{key:airInfo.month, value:airInfo.month}}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) => setAirInfo({ ...airInfo, continent: value })}
            data={Continent}
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
        <FormInput
          placeholder="VALID"
          label="VALID"
          value={date.toLocaleDateString()}
          onChangeText={(value) => handleOnChangeText(value, "valid")}
        />
        <View>
          {/* <Button onPress={showDatepicker} title="Show date picker!" style={{marginHorizontal:20, backgroundColor:'red'}} /> */}
          {/* <Text>selected: {date.toLocaleDateString()}</Text> */}
          <TouchableOpacity
            style={[styles.buttonTime]}
            onPress={showDatepicker}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>Chọn Ngày</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
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

export default UpdateAir;