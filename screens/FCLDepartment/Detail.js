import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";

const Detail = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.item);
  // console.log(data);

  // const titlePolicy = data.policy.substring(0, 90);
  return (
    <View style={styles.detail}>
      <Text style={styles.textDisplayCode}>{data.code}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>Tháng:</Text>
        <Text style={styles.textContent}>{data.month}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>Châu:</Text>
        <Text style={styles.textContent}>{data.continent}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>Loại Container:</Text>
        <Text style={styles.textContent}>{data.type}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>Hãng tàu:</Text>
        <Text style={styles.textContent}>{data.carrier}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>POL:</Text>
        <Text style={styles.textContent}>{data.pol}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>POD:</Text>
        <Text style={styles.textContent}>{data.pod}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>O/F 20:</Text>
        <Text style={styles.textContent}>{data.of20}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>O/F 40:</Text>
        <Text style={styles.textContent}>{data.of40}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>O/F 45:</Text>
        <Text style={styles.textContent}>{data.of45}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>SUR 20:</Text>
        <Text style={styles.textContent}>{data.sur20}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>SUR 40:</Text>
        <Text style={styles.textContent}>{data.sur40}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>LINES:</Text>
        <Text style={styles.textContent}>{data.lines}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>FREE TIME:</Text>
        <Text style={styles.textContent}>{data.freeTime}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>VALID:</Text>
        <Text style={styles.textContent}> {data.valid}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textDisplay}>NOTES:</Text>
        <Text style={styles.textContent}> {data.notes}</Text>
      </View>
      <View style={styles.styleButton}>
        <TouchableOpacity
          style={[styles.buttonUpdate]}
          onPress={() => {
            navigation.replace("Update", {
              data: data,
            });
          }}
        >
          <Text
            style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.primary,
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  textContent: {
    fontSize: 20,
    lineHeight: 25,
    marginRight: 4,
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
    color: color.primary,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textDisplayCode: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "center",
    color: color.primary,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  textUpdate: {
    fontSize: 19,
    color: color.primary,
    fontWeight: "bold",
  },
});
export default Detail;
