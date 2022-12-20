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
const PaidOn = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.id);
  const [paidOn, setPaidOn] = useState();

  const getAllPaidOnItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setPaidOn(res.data.report.sellReport))
      .then((res) => setPaidOn(res.data.report))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllPaidOnItemDetails();
  }, []);

  const renderItem = ({ item }) => {
    console.log("item1234", item);
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ItemPaidOnDetailsInfo',{data:item._id})}>
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
    );
  };

  return (
    <>
      {paidOn?.paidOnBehalfOfReport && (
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            <FlatList
              keyExtractor={(item) => item._id}
              style={styles.list}
              data={paidOn.paidOnBehalfOfReport}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
      <Text>Total Sell: </Text>
      {paidOn?.paidOnBehalfOfReport && <Text>{paidOn.totalPaidOnBehalfOf}</Text>}
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
