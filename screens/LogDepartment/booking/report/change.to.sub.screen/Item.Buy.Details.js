import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import clientReport from "../../../../../api/clientReport";
import { ipAddress } from "../../../../../contains/constant";

const ItemBuyDetails = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.id);
  const [buyItem, setBuyItem] = useState();

  const getAllBuyItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setBuyItem(res.data.report.buyReport))
      .then((res) => setBuyItem(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllBuyItemDetails();
  }, []);

  console.log("buy", route.params);
  // show in flat list
  const renderItem = ({ item }) => {
    // console.log("123item", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemBuyDetailsInfo", { data: item,code:route.params.code })
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
            {/* <Text style={styles.textDisplay}>{item.total}</Text> */}
            <Text style={styles.textDisplay}>
              {/* {item.total} */}
              {item.totalUSD !== 0
                ? `${item.totalUSD} USD ~ ${item.changeToVND} VND`
                : null}
              {item.totalEUR !== 0
                ? `${item.totalEUR} EUR ~ ${item.changeToVND} VND`
                : null}
              {item.totalVND !== 0 ? `${item.totalVND} VND` : null}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>VAT: </Text>
            <Text style={styles.textDisplay}>{item.VAT}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Total (VAT): </Text>
            <Text style={styles.textDisplay}>
              {/* {item.actualPayment} */}
              {item.actualPaymentUSD !== 0
                ? `${item.actualPaymentUSD} USD ~ ${item.changeToVNDVAT} VND`
                : null}
              {item.actualPaymentEUR !== 0
                ? `${item.actualPaymentEUR} EUR ~ ${item.changeToVNDVAT} VND`
                : null}
              {item.totalVND !== 0 ? `${item.totalVND} VND` : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {buyItem?.report && (
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            <FlatList
              keyExtractor={(item) => item._id}
              style={styles.list}
              data={buyItem.report.buyReport}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
      <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <View>
          <Text>Total Buy: </Text>
          {buyItem?.report && <Text>{buyItem.totalBuy}</Text>}
        </View>
        <View>
          <Text>Total Buy (VAT): </Text>
          {buyItem?.report && <Text>{buyItem.totalBuyVAT}</Text>}
        </View>
      </View>
    </>
  );
};

export default ItemBuyDetails;

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
