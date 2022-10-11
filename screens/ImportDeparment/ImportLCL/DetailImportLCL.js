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
        <Text style={styles.textDisplayCode}>Mã Báo Giá: {data.code}</Text>
        <Text style={styles.textDisplay}>Tháng: {data.month}</Text>
        <Text style={styles.textDisplay}>Châu: {data.continent}</Text>
        <Text style={styles.textDisplay}>Loại Cargo: {data.cargo}</Text>
        <Text style={styles.textDisplay}>Pol: {data.pol}</Text>
        <Text style={styles.textDisplay}>Pod: {data.pod}</Text>
        <Text style={styles.textDisplay}>OF: {data.of}</Text>
        <Text style={styles.textDisplay}>Term: {data.term}</Text>
        <Text style={styles.textDisplay}>Local Pol: {data.localpol}</Text>
        <Text style={styles.textDisplay}>Local Pod: {data.localpod}</Text>
        <Text style={styles.textDisplay}>Carrier: {data.carrier}</Text>
        <Text style={styles.textDisplay}>Schedule: {data.schedule}</Text>
        <Text style={styles.textDisplay}>Transit Time: {data.transittime}</Text>
        <Text style={styles.textDisplay}>Valid: {data.valid}</Text>
        <Text style={styles.textDisplay}>Ghi Chú: {data.notes}</Text>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.navigate("UpdateImportLCL", {
                data: data,
              });
            }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  textDisplayCode: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default DetailImportLCL;
