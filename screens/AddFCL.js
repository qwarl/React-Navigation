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
import React, { useEffect, useState } from "react";
import FormDropDownMonth from "../components/FormDropDownMonth";
import FormDropdownContinent from "../components/FormDropdownContinent";
import FormInput from "../components/FormInput";
import FormDropdownStyleFCL from "../components/FormDropdownStyleFCL";
import DateTimePicker from "@react-native-community/datetimepicker";
import color from "./../contains/color";
import axios from "axios";
import SelectList from "react-native-dropdown-select-list";
import { Month } from "../contains/month";
import { Continent } from "../contains/continent";
import { Container } from "../contains/container";
import FormSubmitButton from "./../components/FormSubmitButton";
import {
  isValidObjectField,
  updateError,
} from "../utils/method.js";

const { width, height } = Dimensions.get("window");

const Add = ({ navigation }) => {
  const addQuo = (logs) => {
    const {
      month1,
      continent1,
      type1,
      pol1,
      pod1,
      of201,
      of401,
      of451,
      sur201,
      sur401,
      lines1,
      freeTime1,
      // valid,
      notes1,
    } = logs;
    console.log(logs);
    // const url = `http://localhost:3001/api/phongLogs/create`
    // axios.post(url, {
    // 	month: month1,
    // 	// continent: continent,
    // 	// type: type,
    // 	pol: pol1, pod: pod1, of20: of201, of40: of401, of45: of451, sur20: sur201, sur40: sur401, lines: lines, freeTime: freeTime1,
    // 	// valid: valid,
    // 	notes: notes1 })
    // 	.then(res => {
    // 		console.log(res['logs'].msg)
    // 		console.log(error.res.data)
    // 	})
    // 	.catch(
    // 		err => console.log(err)
    // 	)
  };

  const handleOnChangeText = (value, fieldName) => {
    setFclInfo({ ...fclInfo, [fieldName]: value });
  };

  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState("Empty");

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
      tempDate.getFullYear() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes();
    let fTime =
      "Hours: " + tempDate.getHours() + "| Minutes: " + tempDate.getMinutes();
    setValid(fDate);
    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const addDate = () => {
    showMode("date");
  };
  //const [month1, setMonth1] = useState("");

//   const [continent1, setContinent1] = useState("");
//   const [container1, setContainer1] = useState("");
//   const [pol1, setPol1] = useState("");
//   const [pod1, setPod1] = useState("");
//   const [of201, setOf201] = useState("");
//   const [of401, setOf401] = useState("");
//   const [of451, setOf451] = useState("");
//   const [sur201, setSur201] = useState("");
//   const [sur401, setSur401] = useState("");
//   const [lines1, setLines1] = useState("");
//   const [freeTime1, setFreeTime1] = useState("");
//   const [notes1, setNotes1] = useState("");

  const [fclInfo, setFclInfo] = useState({
    month: "",
    continent: "",
    container: "",
    pol: "",
    pod: "",
    of20: "",
    of40: "",
    of45: "",
    sur20: "",
    sur40: "",
    lines: "",
    freeTime: "",
    notes: "",
  });

  const isValidForm = () => {
    if (!isValidObjectField(fclInfo))
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
        const res = await client.post("/create", { ...fclInfo });
        if (res.data.success) {
			Alert.alert("Thêm Thành Công")
        }
        console.log("running");
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // console.log(fclInfo)

  return (
    <View style={StyleSheet.container}>
      <ScrollView>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) => setFclInfo({...fclInfo, month: value})}
            data={Month}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList 
			setSelected={(value) => setFclInfo({...fclInfo, continent: value})} 
			data={Continent} 
		  />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Loại Container</Text>
          <SelectList 
			setSelected={(value) => setFclInfo({...fclInfo, container: value})}  
			data={Container} 
		  />
        </View>
        {/* <FormDropdownContinent label="Chọn Châu" />
				<FormDropdownStyleFCL label="Chọn Loại Container" /> */}
        <FormInput
          label="POL"
          placeholder="pol"
          onChangeText={(value) => handleOnChangeText(value, "pol")}
          value={fclInfo.pol}
        />
        <FormInput
          label="POD"
          placeholder="pod"
          onChangeText={(value) => handleOnChangeText(value, "pod")}
          value={fclInfo.pod}
        />
        <FormInput
          label="O/F 20"
          placeholder="O/F 20"
		  onChangeText={(value) => handleOnChangeText(value, "of20")}
          value={fclInfo.of20}
        />
        <FormInput
          placeholder="O/F 40"
          label="O/F 40"
		  onChangeText={(value) => handleOnChangeText(value, "of40")}
          value={fclInfo.of40}
        />
        <FormInput
          placeholder="O/F 45"
          label="O/F 45"
          onChangeText={(value) => handleOnChangeText(value, "of45")}
          value={fclInfo.of45}
        />
        <FormInput
          placeholder="SUR 20"
          label="SUR 20"
		  onChangeText={(value) => handleOnChangeText(value, "sur20")}
          value={fclInfo.sur20}
        />
        <FormInput
          placeholder="SUR 40"
          label="SUR 40"
		  onChangeText={(value) => handleOnChangeText(value, "sur40")}
          value={fclInfo.sur40}
        />
        <FormInput
          placeholder="LINES"
          label="LINES"
          onChangeText={(value) => handleOnChangeText(value, "lines")}
          value={fclInfo.lines}
        />
        <FormInput
          placeholder="FREE TIME"
          label="FREE TIME"
		  onChangeText={(value) => handleOnChangeText(value, "freeTime")}
          value={fclInfo.freeTime}
        />
        <FormInput
          placeholder="VALID"
          label="VALID"
          value={fclInfo.valid}
          onChangeText={(value) => handleOnChangeText(value, "valid")}
          onPress={addDate}
        />
        {/* {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )} */}
        <FormInput
          placeholder="NOTES"
          label="NOTES"
          onChangeText={(value) => handleOnChangeText(value, "notes")}
          value={fclInfo.notes}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
          }}
        >
          {/* <TouchableOpacity
						onPress={() => {
							addQuo(month1, pol1, pod1, of201, of401, of451, sur201, sur401, lines1, freeTime1, notes1)
							console.log(month1, container1, continent1, pol1, pod1, of201, of401, of451, sur201, sur401, lines1, freeTime1, notes1);
						}}
					>
						<View style={styles.iconWrapper}>
							<Text style={styles.icon}>send</Text>
						</View>
					</TouchableOpacity> */}
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
            <Text style={{ fontSize: 18, color: "#fff" }}>Insert</Text>
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
    marginLeft: height * 0.445,
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

export default Add;
