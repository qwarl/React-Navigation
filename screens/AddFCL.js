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
		const {
			month,
			// continent, 
			// type,
			pol1, pod1, of201, of401, of451, sur201, sur401, lines1, freeTime1
			// valid, 
			, notes1
		} = logs
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
	const [pol1, setPol1] = useState('')
	const [pod1, setPod1] = useState('')
	const [of201, setOf201] = useState('')
	const [of401, setOf401] = useState('')
	const [of451, setOf451] = useState('')
	const [sur201, setSur201] = useState('')
	const [sur401, setSur401] = useState('')
	const [lines1, setLines1] = useState('')
	const [freeTime1, setFreeTime1] = useState('')
	const [notes1, setNotes1] = useState('')
	const [month1, setMonth1] = useState('')
	// const [month1, setMonth1] = useState('')
	return (
		// <TouchableOpacity
		//   onPress={() => {
		//     navigation.navigate("Detail");
		//   }}
		// >

		// </TouchableOpacity>
		<View style={StyleSheet.container}>
			<ScrollView>
				<FormDropDownMonth label="Chọn Tháng" onChangeText={setMonth1} value={month1} />
				<FormDropdownContinent label="Chọn Châu" />
				<FormDropdownStyleFCL label="Chọn Loại Container" />
				<FormInput label="POL" placeholder="pol" onChangeText={setPol1} value={pol1} />
				<FormInput label="POD" placeholder="pod" onChangeText={setPod1} value={pod1} />
				<FormInput label="O/F 20" placeholder="O/F 20" onChangeText={setOf201} value={of201} />
				<FormInput placeholder="O/F 40" label="O/F 40" onChangeText={setOf401} value={of401} />
				<FormInput placeholder="O/F 45" label="O/F 45" onChangeText={setOf451} value={of451} />
				<FormInput placeholder="SUR 20" label="SUR 20" onChangeText={setSur201} value={sur201} />
				<FormInput placeholder="SUR 40" label="SUR 40" onChangeText={setSur401} value={sur401} />
				<FormInput placeholder="LINES" label="LINES" onChangeText={setLines1} value={lines1} />
				<FormInput placeholder="FREE TIME" label="FREE TIME" onChangeText={setFreeTime1} value={freeTime1} />
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
				<FormInput placeholder="NOTES" label="NOTES" onChangeText={setNotes1} value={notes1} />
				<View style={{ flex: 1, justifyContent: "center" }}>
					<TouchableOpacity
						onPress={() => {
							addQuo(pol1, pod1, of201, of401, of451, sur201, sur401, lines1, freeTime1, notes1)
							// console.log(pol1, pod1, of201, of401, of451, sur201, sur401, lines1, freeTime1, notes1);
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
