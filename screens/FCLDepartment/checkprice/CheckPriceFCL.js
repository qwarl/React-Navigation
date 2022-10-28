import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import clientCheckPriceFCL from "../../../api/clientCheckPriceFCL";
import color from "../../../contains/color";

const CheckPriceFCL = ({ navigation }) => {
  const [data1, setData1] = useState([]);

  // console.log('data1', data1[0].valid);
  // console.log('data2', data1[0].valid.toString().length);
  // console.log('data1', data1[0].valid.slice(data1[0].valid.toString().length - 4)==fclInfo.valid);

  const [value, setValue] = useState(null);

  const [type, setType] = useState("");

  const [fclInfo, setFCLInfo] = useState({
    month: "",
    continent: "",
    year: "",
    betweenprice: "",
    type: "",
  });

  // function getData() {
  //   const url = `/api/fcl-check/getAll`;
  //   axios.get(ipAddress + url).then((res) => {
  //     setData1(res["data"].quotations);
  //   });
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    clientCheckPriceFCL
      .get("/getAll")
      .then((res) => {
        setData1(res.data.checkPriceFCL);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data1]);

  const [searchText, setSearchText] = useState("");
  // console.log(data1.container);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          "Thông Báo",
          "Bạn có muốn tạo một báo giá mới theo yêu cầu sale không?",
          [
            {
              text: "Hủy",
              onPress: () => console.log("Cancel required"),
              style: "cancel",
            },
            {
              text: "Phản hồi",
              onPress: () => {
                navigation.navigate("AddFCLRequiteSale", {
                  item: item,
                });
              },
            },
          ]
        );
      }}
    >
      <View style={styles.detail}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Loại Container: </Text>
          <Text style={styles.textDisplay}>{item.type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Cảng Đi: </Text>
          <Text style={styles.textDisplay}>{item.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Cảng Đến: </Text>
          <Text style={styles.textDisplay}>{item.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>OF 20: </Text>
          <Text style={styles.textDisplay}>{item.of20}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>SUR 20: </Text>
          <Text style={styles.textDisplay}>{item.sur20}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Ngày: </Text>
          <Text style={styles.textDisplay}>{item.valid}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const checkPriceSearch = (eachFcl) => {
    let result = false;
    const end = fclInfo.betweenprice.indexOf("đến");
    const value1 = fclInfo.betweenprice.substring(3, end - 1);
    const value2 = fclInfo.betweenprice.substring(end + 4);
    if (eachFcl.price > value1 && eachFcl.price < value2) {
      result = true;
    } else if (fclInfo.betweenprice == "") {
      result = true;
    }

    return result;
  };

  const checkTypeSearch = (searchText, eachFcl) => {
    let result = false;
    if (
      eachFcl.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachFcl.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachFcl.code.toLowerCase().includes(searchText.toLowerCase()) ||
      eachFcl.carrier.toLowerCase().includes(searchText.toLowerCase())
      // || eachFcl.valid.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredFCL = () =>
    data1.filter(
      (eachFcl) =>
        eachFcl.month.toLowerCase().includes(fclInfo.month.toLowerCase()) &&
        eachFcl.continent
          .toLowerCase()
          .includes(fclInfo.continent.toLowerCase()) &&
        checkTypeSearch(searchText, eachFcl) &&
        checkPriceSearch(eachFcl) &&
        eachFcl.type.toLowerCase().includes(fclInfo.type.toLowerCase()) &&
        eachFcl.valid.slice(eachFcl.valid.length - 4).includes(fclInfo.year)
    );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 7 }}>
        <View style={styles.displayData}>
          {filteredFCL().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredFCL()}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View
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
          )}
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddCheckPriceFCL");
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
export default CheckPriceFCL;
