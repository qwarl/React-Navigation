import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
	Dimensions,
} from "react-native";
import React, { useState } from "react";
import FormDropDownMonth from "../components/FormDropDownMonth";
import FormDropdownContinent from "../components/FormDropdownContinent";
import FormInput from "../components/FormInput";
import FormDropdownStyleFCL from "../components/FormDropdownStyleFCL";
import DateTimePicker from '@react-native-community/datetimepicker';
import color from "./../contains/color";
import axios from 'axios';

const { width, height } = Dimensions.get("window");


const Add = ({ navigation }) => {

	const addQuo = (logs) => {
		const { month, continent, type, pol, pod, of20, of40, of45, sur20, sur40, lines, freeTime, valid, notes } = logs

		const url = `http://localhost:3001/api/phongLogs`
		axios.post(url, { month: month, continent: continent, type: type, pol: pol, pod: pod, of20: of20, of40: of40, of45: of45, sur20: sur20, sur40: sur40, lines: lines, freeTime: freeTime, valid: valid, notes: notes })
			.then(res => {
				console.log(res['logs'].msg)
				console.log(error.response.data)
			})
			.catch(
				err => console.log(err)
			)
	}

	const [fclInfo, setFclInfo] = useState({
		month: "",
		continent: "",
		type: "",
		pol: "",
		pod: "",
		of20: "",
		of40: "",
		of45: "",
		sur20: "",
		sur40: "",
		lines: "",
		freeTime: "",
		valid: "",
		notes: "",
	});

	const handleOnChangeText = (value, fieldName) => {
		setUserInfo({ ...useInfo, [fieldName]: value });
	};

	const [error, setError] = useState("");

	const {
		month,
		continent,
		type,
		pol,
		pod,
		of20,
		of40,
		of45,
		sur20,
		sur40,
		lines,
		notes,
	} = fclInfo;

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
		showMode('date');
	}

	return (
		// <TouchableOpacity
		//   onPress={() => {
		//     navigation.navigate("Detail");
		//   }}
		// >

		// </TouchableOpacity>
		<View style={StyleSheet.container}>
			<ScrollView>
				<FormDropDownMonth label="Chọn Tháng" />
				<FormDropdownContinent label="Chọn Châu" />
				<FormDropdownStyleFCL label="Chọn Loại Container" />
				<FormInput label="POL" placeholder="pol" />
				<FormInput label="POD" placeholder="pod" />
				<FormInput label="O/F 20" placeholder="O/F 20" />
				<FormInput placeholder="O/F 40" label="O/F 40" />
				<FormInput placeholder="O/F 45" label="O/F 45" />
				<FormInput placeholder="SUR 20" label="SUR 20" />
				<FormInput placeholder="SUR 40" label="SUR 40" />
				<FormInput placeholder="LINES" label="LINES" />
				<FormInput placeholder="FREE TIME" label="FREE TIME" />
				<FormInput
					placeholder="VALID"
					label="VALID"
					value={valid}
					onChangeText={(value) => handleOnChangeText(value, "valid")}
					onPress={addDate}
				/>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode={mode}
						is24Hour={true}
						display='default'
						onChange={onChange}
					/>
				)}
				<FormInput placeholder="NOTES" label="NOTES" />
				<View style={{ flex: 1, justifyContent: "center" }}>
					<TouchableOpacity
						onPress={() => {
							addQuo(fclInfo)
						}}
					>
						<View style={styles.iconWrapper}>
							<Text style={styles.icon}>send</Text>
						</View>
					</TouchableOpacity>
					</View>
		
			</ScrollView >
		</View >
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
});

export default Add;
