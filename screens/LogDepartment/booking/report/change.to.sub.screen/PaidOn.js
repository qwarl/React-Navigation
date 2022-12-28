import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import clientReport from "../../../../../api/clientReport";
import { ipAddress } from "../../../../../contains/constant";
import color from "../../../../../contains/color";
const PaidOn = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.id);
  const [paidOn, setPaidOn] = useState();

  const getAllPaidOnItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setPaidOn(res.data.report.sellReport))
      .then((res) => setPaidOn(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllPaidOnItemDetails();
  }, []);
  console.log("paidOn", route.params.code);
  const renderItem = ({ item }) => {
    // console.log("item1234", item);
    return (
      <>
        {route.params.code === "PROFIT_REPORT" ? (
          //   <TouchableOpacity
          //   onPress={() =>
          //     navigation.navigate("ItemPaidOnDetailsInfo", { data: item })
          //   }
          // >
          <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Loại phí: </Text>
              <Text style={styles.textDisplay}>{item.typeOfFee}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Số tiền: </Text>
              <Text style={styles.textDisplay}>{item.price}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Số hóa đơn: </Text>
              <Text style={styles.textDisplay}>{item.invoiceNumber}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Thu: </Text>
              <Text style={styles.textDisplay}>{item.payer}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>T/T cho: </Text>
              <Text style={styles.textDisplay}>{item.paymentFor}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Tên người chi: </Text>
              <Text style={styles.textDisplay}>{item.paidBy}</Text>
            </View>
          </View>
        ) : (
          // </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemPaidOnDetailsInfo", { data: item })
            }
          >
            <View style={styles.item}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>Loại phí: </Text>
                <Text style={styles.textDisplay}>{item.typeOfFee}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>Số tiền: </Text>
                <Text style={styles.textDisplay}>{item.price}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>Số hóa đơn: </Text>
                <Text style={styles.textDisplay}>{item.invoiceNumber}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>Thu: </Text>
                <Text style={styles.textDisplay}>{item.payer}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>T/T cho: </Text>
                <Text style={styles.textDisplay}>{item.paymentFor}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textLable}>Tên người chi: </Text>
                <Text style={styles.textDisplay}>{item.paidBy}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      {paidOn?.report && (
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            <FlatList
              keyExtractor={(item) => item._id}
              style={styles.list}
              data={paidOn.report.paidOnBehalfOfReport}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: color.primary,
          padding: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5,
          borderRadius: 8,
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>
          Chi hộ:{" "}
        </Text>
        {paidOn?.report && (
          <Text style={{ fontSize: 17, color: "white" }}>
            {paidOn.totalPaidOn} VND
          </Text>
        )}
      </View>
    </>
  );
};

export default PaidOn;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 8,
  },
  displayData: {
    flex: 1,
    width: "100%",
  },
  textDisplay: {
    fontSize: 19,
    lineHeight: 25,
    alignItems: "center",
  },
  textLable: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  item: {
    marginLeft: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#0176E4",
    borderWidth: 1,
  },
});
