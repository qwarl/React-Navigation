import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../../contains/color";

const DetailImportLCL = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.item);
  return (
    <ScrollView>
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
          <Text style={styles.textDisplay}>Loại Cargo:</Text>
          <Text style={styles.textContent}>{data.cargo}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Pol:</Text>
          <Text style={styles.textContent}>{data.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Pod: </Text>
          <Text style={styles.textContent}>{data.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>OF:</Text>
          <Text style={styles.textContent}>{data.of}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Term:</Text>
          <Text style={styles.textContent}>{data.term}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Local Pol:</Text>
          <Text style={styles.textContent}>{data.localpol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Local Pod:</Text>
          <Text style={styles.textContent}>{data.localpod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Carrier:</Text>
          <Text style={styles.textContent}>{data.carrier}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Schedule:</Text>
          <Text style={styles.textContent}>{data.schedule}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Transit Time:</Text>
          <Text style={styles.textContent}>{data.transittime}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Valid:</Text>
          <Text style={styles.textContent}>{data.valid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ghi Chú:</Text>
          <Text style={styles.textContent}>{data.notes}</Text>
        </View>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.navigate("UpdateImportLCL", {
                data: data,
              });
            }}
          >
            <Text style={styles.textUpdate}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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

export default DetailImportLCL;
