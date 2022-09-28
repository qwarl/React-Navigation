import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
	Dimensions,
	Alert,
	Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import color from "../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("window");
import { isValidObjectField, updateError } from "../../utils/method.js";
import { Container, Continent, Month } from "../../contains/constant";
import axios from "axios";
import client from "../../api/client";

const Add = ({ navigation, route }) => {
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

	useEffect(() => {
		setFclInfo((prev) => {
			return { ...prev, valid: date };
		});
	}, [date]);

	let {
		type,
		continent,
		month,
		pol,
		carrier,
		pod,
		of20,
		of40,
		of45,
		sur20,
		sur40,
		valid,
		freeTime,
		lines,
		notes,
	} = route?.params || {};

	const handleOnChangeText = (value, fieldName) => {
		setFclInfo({ ...fclInfo, [fieldName]: value });
	};

	const addDate = () => {
		showMode("date");
	};
	const [fclInfo, setFclInfo] = useState({
		month: month,
		continent: continent,
		type: type,
		pol: pol,
		pod: pod,
		carrier: carrier,
		of20: of20,
		of40: of40,
		of45: of45,
		sur20: sur20,
		sur40: sur40,
		valid: valid,
		lines: lines,
		freeTime: freeTime,
		notes: notes,
	});

	const submitForm = async () => {
		try {
			const res = await client.post("/create", { ...fclInfo });
			if (res.data.success) {
				Alert.alert("Thêm Thành Công");
			}
			console.log("running");
			console.log(res.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	const submitUpdateForm = async () => {
		// if (isValidForm()) {

		const url = `http://192.168.1.23:3001/api/quotations/update/${route.params._id}`;

		try {
			const res = await axios.post(url, { ...fclInfo });
			if (res.data.success) {
				Alert.alert("Cập nhật thành công");
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
				<View>
					<View style={styles.dropMenu}>
						<Text style={styles.label}>Chọn Tháng</Text>
						<SelectList
							setSelected={(value) => setFclInfo({ ...fclInfo, month: value })}
							data={Month}
							// defaultOption={{ key: month, value: month }}
							defaultOption={{ key: month, value: month }}
						/>
					</View>
					<View style={styles.dropMenu}>
						<Text style={styles.label}>Chọn Châu</Text>
						<SelectList
							setSelected={(value) =>
								setFclInfo({ ...fclInfo, continent: value })
							}
							data={Continent}
							defaultOption={{ key: continent, value: continent }}
						/>
					</View>
					<View style={styles.dropMenu}>
						<Text style={styles.label}>Chọn Loại Container</Text>
						<SelectList
							setSelected={(value) =>
								setFclInfo({ ...fclInfo, type: value })
							}
							data={Container}
							defaultOption={{ key: type, value: type }}
						/>
					</View>
				</View>

				<FormInput
					label="HÃNG TÀU"
					placeholder="HÃNG TÀU"
					onChangeText={(value) => handleOnChangeText(value, "carrier")}
					value={fclInfo.carrier}
				/>
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
					value={date.toLocaleDateString()}
				/>
				<View>
					<Button onPress={showDatepicker} title="Show date picker!" />
					{/* <Text>selected: {date.toLocaleDateString()}</Text> */}
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
					placeholder="NOTES"
					label="NOTES"
					onChangeText={(value) => handleOnChangeText(value, "notes")}
					value={fclInfo.notes}
				/>
				{!route.params && (
					<View
						style={{
							flex: 1,
							marginVertical: 30,
							marginHorizontal: 80,
							justifyContent: "center",
						}}
					>
						<TouchableOpacity style={styles.buttonInsert} onPress={submitForm}>
							<Text style={{ fontSize: 18, color: "#fff" }}>Insert</Text>
						</TouchableOpacity>
					</View>
				)}
				{
					// insertOrUpdate==1&&
					route.params && (
						<View
							style={{
								flex: 1,
								marginVertical: 30,
								marginHorizontal: 80,
								justifyContent: "center",
							}}
						>
							<TouchableOpacity
								style={styles.buttonUpdate}
								onPress={submitUpdateForm}
							>
								<Text style={{ fontSize: 18, color: "#fff" }}>Update</Text>
							</TouchableOpacity>
						</View>
					)
				}
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
		// opacity: 0.5,
		// zIndex:-1
	},
	buttonUpdate: {
		height: 45,
		backgroundColor: "rgba(27,27,51,1)",
		// backgroundColor: "green",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		// opacity: 0.5,
		// marginTop: -165,
		zIndex: -1,
	},
});

export default Add;
