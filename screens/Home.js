import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "./../contains/color";
import FormDropdownContinent from "../components/FormDropdownContinent";
import FormDropDownMonth from "../components/FormDropDownMonth";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
	const [data, setData] = useState('');
	useEffect(() => {
		const url = `http://192.168.1.104:3001/api/quotations/getAll`;
		axios.get(url)
			// .then(res => setSubAdminData(res['data']))
			.then(res => {
				console.log(res['data'])
				setData(res['data'])
			})

	}, [])

	const ListItem = ({ item }) => {

		return (
			<View style={styles.listContainer}>
				<Text style={{ marginLeft: 10, fontSize: 20 }}>Tháng: {item.month}</Text>
				<Text style={styles.item}>Cảng đi: {item.pol}</Text>
				<Text style={styles.item}>Cảng đến: {item.pod}</Text>
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flex: 4,
					justifyContent: "space-between",
					marginBottom: 50,
					flexDirection: "row",
				}}
			>
				<FormDropDownMonth label="Chọn Tháng" />
				<FormDropdownContinent label="Chọn Châu" />
				<FlatList
                keyExtractor={item => item._id}
                data={data}
                renderItem={
                    ({ item }) => <ListItem item={item} />
                } />

			</View>
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
        backgroundColor: '#f1f1f1',
        // flexDirection:'row',
        margin: width * 3.6 / 187.5,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
        width: '100%'
    },
});

export default Home;
