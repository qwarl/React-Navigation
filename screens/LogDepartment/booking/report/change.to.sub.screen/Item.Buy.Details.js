import { StyleSheet, Text, View,FlatList,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import clientReport from "../../../../../api/clientReport";
import { ipAddress } from "../../../../../contains/constant";

const ItemBuyDetails = ({route,navigation}) => {
  const [data, setData] = useState(route.params.id);
  const [buyItem, setBuyItem] = useState();

  const getAllBuyItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setBuyItem(res.data.report.buyReport))
      .then((res) => setBuyItem(res.data.report))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllBuyItemDetails();
  }, []);

  // show in flat list
  const renderItem = ({ item }) => {
    console.log("item123", item);
    return (
      <TouchableOpacity>
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
            <Text style={styles.textDisplay}>{item.total}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {buyItem?.buyReport && (
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            <FlatList
              keyExtractor={(item) => item._id}
              style={styles.list}
              data={buyItem.buyReport}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
      <Text>Total Sell: </Text>
      {buyItem?.buyReport && <Text>{buyItem.totalBuy}</Text>}
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
