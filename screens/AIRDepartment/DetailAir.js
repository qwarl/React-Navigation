import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";

const DetailAir = ({ navigation, route }) => {
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
          <Text style={styles.textDisplay}>Loại Vận Chuyển:</Text>
          <Text style={styles.textContent}>{data.shippingtype}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Aol:</Text>
          <Text style={styles.textContent}>{data.aol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Aod:</Text>
          <Text style={styles.textContent}>{data.aod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Dim:</Text>
          <Text style={styles.textContent}>{data.dim}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Gross Weight:</Text>
          <Text style={styles.textContent}>{data.grossweight}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Type Of Cargo:</Text>
          <Text style={styles.textContent}>{data.typeofcargo}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Air Freight:</Text>
          <Text style={styles.textContent}>{data.airfreight}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Sur:</Text>
          <Text style={styles.textContent}>{data.sur}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Air Lines:</Text>
          <Text style={styles.textContent}>{data.airlines}</Text>
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
          <Text style={styles.textContent}> {data.note}</Text>
        </View>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.replace("UpdateAir", {
                data: data,
              });
            }}
          >
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Update
            </Text>
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

export default DetailAir;
