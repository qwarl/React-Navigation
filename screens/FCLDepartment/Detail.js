import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";

const Detail = ({ navigation, route }) => {
	const [data, setData] = useState(route.params.item);
	// console.log(data);

	// const titlePolicy = data.policy.substring(0, 90);
	return (
		<View style={styles.detail}>
			<Text style={styles.textDisplay}>{data.code}</Text>
			<Text style={styles.textDisplay}>Tháng: {data.month}</Text>
			<Text style={styles.textDisplay}>Châu: {data.continent}</Text>
			<Text style={styles.textDisplay}>Loại Container: {data.type}</Text>
			<Text style={styles.textDisplay}>Hãng tàu: {data.carrier}</Text>
			<Text style={styles.textDisplay}>POL: {data.pol}</Text>
			<Text style={styles.textDisplay}>POD: {data.pod}</Text>
			<Text style={styles.textDisplay}>O/F 20: {data.of20}</Text>
			<Text style={styles.textDisplay}>O/F 40: {data.of40}</Text>
			<Text style={styles.textDisplay}>O/F 45: {data.of45}</Text>
			<Text style={styles.textDisplay}>SUR 20: {data.sur20}</Text>
			<Text style={styles.textDisplay}>SUR 40: {data.sur40}</Text>
			<Text style={styles.textDisplay}>LINES: {data.lines}</Text>
			<Text style={styles.textDisplay}>FREE TIME: {data.freeTime}</Text>
			<Text style={styles.textDisplay}>VALID: {data.valid}</Text>

			<Text style={styles.textDisplay}>NOTES: {data.notes}</Text>
			<View style={styles.styleButton}>
				<TouchableOpacity
					style={[styles.buttonUpdate]}
					onPress={() => {
						navigation.navigate("Update", {
							data: data,
						});
					}}
				>
					<Text style={{ fontSize: 18, color: "black" }}>Update</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	detail: {
		borderRadius: 15,
		borderColor: "#000",
		backgroundColor: color.backgrounDisplayDetail,
		marginVertical: 20,
		marginHorizontal: 10,
		padding: 20,
	},
	textDisplay: {
		fontSize: 20,
		fontWeight: "bold",
		lineHeight: 25,
		marginRight: 9,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonInsert: {
		height: 45,
		backgroundColor: color.borderColor,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		width: 170,
		marginVertical: 30,
		alignContent: "center",
	},
	buttonDetail: {
		height: 45,
		backgroundColor: color.borderColor,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		width: 170,
		marginVertical: 10,
		marginLeft: 30,
		alignContent: "center",
	},
	buttonUpdate: {
		marginTop: 20,
		height: 45,
		borderColor: color.borderColor,
		borderWidth: 2,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		width: 170,
		marginBottom: 30,
	},
	styleButton: {
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Detail