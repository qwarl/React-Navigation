import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	RadioButton
} from 'react-native-paper';
import axios from "axios";
import color from "../../contains/color";
import { Continent, Month } from "../../contains/constant";
import SelectList from "react-native-dropdown-select-list";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
	const [data1, setData1] = useState("");
	useEffect(() => {
		const url = `http://192.168.1.82:3001/api/quotations/getAll`;
		axios.get(url).then((res) => {
			setData1(res["data"].quotations);
		});
	}, []);

	const [fclInfo, setFCLInfo] = useState({
		month: "",
		continent: "",
		year: "",
		beweenprice: "",
	});
	const ListItem = ({ item }) => {
		// console.log('month', item.month);
		return (
			<TouchableOpacity onPress={() => navigation.navigate("Add", item)}>
				<Text style={{ marginLeft: 10, fontSize: 20 }}>
					Tháng: {item.month}
				</Text>
				<Text style={styles.item}>Cảng đi: {item.pol}</Text>
				<Text style={styles.item}>Cảng đến: {item.pod}</Text>
			</TouchableOpacity>
		);
	};

	const [value, setValue] = React.useState();
	console.log(value)

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					justifyContent: "space-between",
					flexDirection: "row",
				}}
			>
				{/* <FormDropDownMonth label="Chọn Tháng" />
				<FormDropdownContinent label="Chọn Châu" /> */}
				<View style={styles.dropMenu}>
					<Text style={styles.label}>Chọn Tháng</Text>
					<SelectList
						setSelected={(value) => setFCLInfo({ ...fclInfo, month: value })}
						data={Month}
						dropdownStyles={{
							backgroundColor: "#D9DBDB",
							fontSize: 28,
							fontWeight: "bold",
						}}
					/>
				</View>
				<View style={styles.dropMenu}>
					<Text style={styles.label}>Loại Vận Chuyển</Text>
					<SelectList
						setSelected={(value) =>
							setFCLInfo({ ...fclInfo, continent: value })
						}
						data={Continent}
						dropdownStyles={{
							backgroundColor: "#D9DBDB",
						}}
					/>
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
					<RadioButton.Item label="GP" value="GP" />
					<RadioButton.Item label="RF" value="RF" />
					<RadioButton.Item label="FR" value="FR" />
					<RadioButton.Item label="OT" value="OT" />
					<RadioButton.Item label="HC" value="HC" />
				</RadioButton.Group>

			</View>

			{data1 && (
				<FlatList
					keyExtractor={(item) => item._id}
					style={{ backgroundColor: "coral", height: height * 0.5 }}
					data={data1}
					renderItem={
						// ({ item }) => <ListItem item={item} />
						ListItem
					}
				/>
			)}
			<View style={{ flex: 1, justifyContent: "center" }}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Add");
					}}
				>
					<View style={styles.iconWrapper}>
						<Text style={styles.icon}>+</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
		marginBottom: 0,
	},
	icon: {
		fontSize: 24,
		color: color.white,
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		marginLeft: 10,
	},
	listContainer: {
		backgroundColor: "b",
		// flexDirection:'row',
		margin: (width * 3.6) / 187.5,
		padding: (width * 3.6) / 187.5,
		borderRadius: (width * 3.6) / 187.5,
		width: "100%",
	},
	dropMenu: {
		paddingHorizontal: 5,
		paddingVertical: 4,
		flex: 1,
		minWidth: 190,
		minHeight: 40,
		zIndex: 1000,
	},
	label: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
});

export default Home;
