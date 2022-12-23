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

const ItemSellDetails = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.id);
  // const id=route.params.id
  const [sellItem, setSellItem] = useState();
  // get sell item details from report
  const getAllSellItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setSellItem(res.data.report.sellReport))
      .then((res) => setSellItem(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllSellItemDetails();
  }, []);

  console.log("add them", sellItem);

  // show in flat list
  const renderItem = ({ item }) => {
    // console.log("item123", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemSellDetailsInfo", { data: item })
        }
      >
        <View style={styles.item}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Loại phí: </Text>
            <Text style={styles.textDisplay}>{item.typeOfFee}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Số lượng: </Text>
            <Text style={styles.textDisplay}>{item.quantity}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Đơn giá: </Text>
            <Text style={styles.textDisplay}>{item.unitPrice}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Đồng tiền: </Text>
            <Text style={styles.textDisplay}>{item.currency}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Total: </Text>
            <Text style={styles.textDisplay}>
              {/* {item.total} */}
              {item.totalUSD !== 0 ? `${item.totalUSD} USD` : null}
              {item.totalEUR !== 0 ? `${item.totalEUR} EUR` : null}
              {item.totalVND !== 0 ? `${item.totalVND} VND` : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {sellItem?.report && (
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            <FlatList
              keyExtractor={(item) => item._id}
              style={styles.list}
              data={sellItem.report.sellReport}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
      <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
        <View style={{ borderRight: 5 }}>
          <Text>Total USD: </Text>
          {sellItem?.report && (
            <Text>
              {sellItem.totalSellUSD} ~ {sellItem.changeSellToVND}
            </Text>
          )}
          <Text>Total VND: </Text>
          {sellItem?.report && <Text>{sellItem.totalSellVND}</Text>}
          <Text>Total Sell: </Text>
          {sellItem?.report && <Text>{sellItem.totalSell}</Text>}
        </View>
        <View>
          <Text>Thành tiền USD (VAT): </Text>
          {sellItem?.report && (
            <Text>
              {sellItem.actualPaymentSellUSD} ~ {sellItem.changeSellVATToVND}
            </Text>
          )}
          <Text>Thành tiền VND (VAT): </Text>
          {sellItem?.report && <Text>{sellItem.actualPaymentSellVND}</Text>}
        </View>
        <View>
          <Text>Total (VAT): </Text>
          {sellItem?.report && <Text>{sellItem.approximatelySellToVnd}</Text>}
        </View>
      </View>
    </>
  );
};

export default ItemSellDetails;

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
