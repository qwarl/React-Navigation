import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ipAddress } from "../../../../contains/constant";
import color from "../../../../contains/color";
const ProfitReportScreen = ({ navigation }) => {
  // get all report created
  const [report, setReport] = useState();

  const getAllReport = async () => {
    const url = `api/report-log/getAll`;
    axios.get(`${ipAddress}/${url}`).then((res) => {
      setReport(res["data"].reportLogs);
    });
  };

  useEffect(() => {
    getAllReport();
  }, []);
  // console.log("hihihi", report);
  // show item in flat list
  const renderItem = ({ item }) => {
    console.log("itemmmmmmmmmmmmmmmmm", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfitReport", {
            data1: item._id,
            code: 'PROFIT_REPORT',
          })
        }
      >
        <View style={styles.item}>
          <View>
            {/* <Text style={styles.textDisplayCode}>{item.info.idfile}</Text> */}
            <Text style={styles.textDisplayCode}>{item.info.idfile}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Mã Báo Giá: </Text>
            <Text style={styles.textDisplay}>{item.info.code}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Khách hàng: </Text>
            <Text style={styles.textDisplay}>{item.info.customer}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Docs: </Text>
            <Text style={styles.textDisplay}>{item.info.docs}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Sales: </Text>
            <Text style={styles.textDisplay}>{item.info.sales}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Số tờ khai: </Text>
            <Text style={styles.textDisplay}>
              {item.info.numberdeclaration}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Ngày tờ khai: </Text>
            <Text style={styles.textDisplay}>{item.info.daydeclaration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{ flex: 5 }}>
        <View style={styles.displayData}>
          <FlatList
            keyExtractor={(item) => item._id}
            style={styles.list}
            data={report}
            renderItem={renderItem}
          />
        </View>
      </View>
    </>
  );
};

export default ProfitReportScreen;

const styles = StyleSheet.create({
  item: {
    marginLeft: 10,
  },
  dropMenu: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    flex: 1,
    minWidth: 190,
    minHeight: 40,
    zIndex: 1000,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  styleSearch: {
    flex: 1,
    height: 50,
    paddingLeft: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#BFBFBF",
    borderRadius: 30,
    fontSize: 18,
  },
  detail: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#0176E4",
    borderWidth: 1,
  },
  textLable: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    paddingLeft: 35,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: color.borderColor,
    borderRadius: 30,
    fontSize: 18,
  },
  textDisplay: {
    fontSize: 19,
    lineHeight: 25,
    alignItems: "center",
  },
  displayData: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textDisplayCode: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 17,
    fontWeight: "500",
    color: "#0176E4",
    textDecorationLine: "underline",
  },
});
