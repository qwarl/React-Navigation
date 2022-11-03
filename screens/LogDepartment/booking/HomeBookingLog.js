import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../contains/color";
import clientBookingLog from "../../../api/clientBookingLog";

const HomeBookingLog = ({ navigation }) => {
  const [bookingInfo, setBookingInfo] = useState({
    month: "",
    freight: "",
    year: "",
    beweenprice: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  // const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    clientBookingLog
      .get("/getAll")
      .then((res) => {
        setData(res.data.bookingLog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  // const checkPriceSearch = (eachLog) => {
  //   let result = false;
  //   const end = bookingInfo.beweenprice.indexOf("đến");
  //   const value1 = bookingInfo.beweenprice.substring(3, end - 1);
  //   const value2 = bookingInfo.beweenprice.substring(end + 4);
  //   if (eachLog.price > value1 && eachLog.price < value2) {
  //     result = true;
  //   } else if (bookingInfo.beweenprice == "") {
  //     result = true;
  //   }

  //   return result;
  // };

  // const checkTypeSearch = (searchText, eachLog) => {
  //   let result = false;
  //   if (
  //     eachLog.pol.toLowerCase().includes(searchText.toLowerCase()) ||
  //     eachLog.pod.toLowerCase().includes(searchText.toLowerCase()) ||
  //     eachLog.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
  //     eachLog.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     eachLog.code.toLowerCase().includes(searchText.toLowerCase())
  //   ) {
  //     result = true;
  //   }
  //   return result;
  // };

  // const filteredLog = () =>
  //   data.filter(
  //     (eachLog) =>
  //       eachLog.month.toLowerCase().includes(bookingInfo.month.toLowerCase()) &&
  //       eachLog.freight
  //         .toLowerCase()
  //         .includes(bookingInfo.freight.toLowerCase()) &&
  //       checkTypeSearch(searchText, eachLog) &&
  //       checkPriceSearch(eachLog)
  //   );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailBooking", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <View>
          <Text style={styles.textDisplayCode}>{item.idfile}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Số Báo Giá: </Text>
          <Text style={styles.textDisplay}>{item.code}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Khách Hàng: </Text>
          <Text style={styles.textDisplay}>{item.customer}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Loại Hình: </Text>
          <Text style={styles.textDisplay}>{item.type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Số Tờ Khai: </Text>
          <Text style={styles.textDisplay}>{item.numberdeclaration}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Ngày Tờ Khai: </Text>
          <Text style={styles.textDisplay}>{item.daydeclaration}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Phân Luồng: </Text>
          <Text style={styles.textDisplay}>{item.stream}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Loại Hàng: </Text>
          <Text style={styles.textDisplay}>{item.typeProduct}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 9 }}>
        <View style={styles.displayData}>
          {/* {filteredLog().length > 0 ? ( */}
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          {/* ) : ( */}
          {/* <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>
                Không có dữ liệu có tên là: {searchText}
              </Text>
            </View>
          )} */}
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          marginTop: -60,
          marginBottom: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewAddBooking");
          }}
        >
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: color.primary,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.background,
    position: "absolute",
    right: 10,
    marginBottom: 0,
  },
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
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

export default HomeBookingLog;