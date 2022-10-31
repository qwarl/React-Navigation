import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Button,
  RefreshControl
  } from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../../contains/color";
import clientTruck from "../../../api/clientTruck";
import { Dropdown } from "react-native-element-dropdown";
import {
  Continent,
  Month1,
  TypeTruck,
  Year1,
} from "../../../contains/constant";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeTruck = ({ navigation }) => {
  const [truckInfo, setTruckInfo] = useState({
    month: "",
    continent: "",
    year: "",
    typetruck: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    navigation.replace('HomeTabTruck')
    // alert('refresh')
    // console.log('refreshed')
    wait(500).then(() => setRefreshing(false));
  }, [])
  //   useEffect(() => {
  //     data.map((item) => console.log(item.shippingtype));
  //   }, []);
  // call api get Log
  useEffect(() => {
    clientTruck
      .get("/getAll")
      .then((res) => {
        setData(res.data.truck);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  // const checkPriceSearch = (eachAir) => {
  //   let result = false;
  //   const end = truckInfo.beweenprice.indexOf("đến");
  //   const value1 = truckInfo.beweenprice.substring(3, end - 1);
  //   const value2 = truckInfo.beweenprice.substring(end + 4);
  //   if (eachAir.price > value1 && eachAir.price < value2) {
  //     result = true;
  //   } else if (truckInfo.beweenprice == "") {
  //     result = true;
  //   }

  //   return result;
  // };

  const checkTypeSearch = (searchText, eachTruck) => {
    let result = false;
    if (
      eachTruck.addressdelivery
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      eachTruck.addressreceive
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      eachTruck.productname.toLowerCase().includes(searchText.toLowerCase()) ||
      eachTruck.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredTruck = () =>
    data.filter(
      (eachTruck) =>
        eachTruck.month.toLowerCase().includes(truckInfo.month.toLowerCase()) &&
        eachTruck.continent
          .toLowerCase()
          .includes(truckInfo.continent.toLowerCase()) &&
        eachTruck.typetruck
          .toLowerCase()
          .includes(truckInfo.typetruck.toLowerCase()) &&
        checkTypeSearch(searchText, eachTruck)
      // && checkPriceSearch(eachLog)
    );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailTruck", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <View>
          <Text style={styles.textDisplayCode}>{item.code}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Tên Hàng: </Text>
          <Text style={styles.textDisplay}>{item.productname}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>ĐC Lấy Hàng: </Text>
          <Text style={styles.textDisplay}>{item.addressdelivery}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>ĐC Nhận Hàng: </Text>
          <Text style={styles.textDisplay}>{item.addressreceive}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Loại xe tải: </Text>
          <Text style={styles.textDisplay}>{item.typetruck}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Châu: </Text>
          <Text style={styles.textDisplay}>{item.continent}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="search"
            size={28}
            color="white"
            style={{ position: "absolute", top: 20, left: 30, zIndex: 1000 }}
          />
          <TextInput
            style={styles.styleSearch}
            placeholder="Tìm kiếm"
            placeholderTextColor={"white"}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View style={{ flexDirection: "row", minHeight: 100 }}>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Chọn Tháng</Text>
            <View style={styles.containerDropDown}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Month1}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onChange={(value) => {
                  setTruckInfo({ ...truckInfo, month: value.value });
                }}
              />
            </View>
          </View>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Chọn Châu</Text>
            <View style={styles.containerDropDown}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Continent}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onChange={(value) => {
                  setTruckInfo({ ...truckInfo, continent: value.value });
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", minHeight: 100 }}>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Chọn Năm</Text>
            <View style={styles.containerDropDown}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Year1}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onChange={(value) => {
                  setTruckInfo({ ...truckInfo, year: value.value });
                }}
              />
            </View>
          </View>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Loại Vận Chuyển</Text>
            <View style={styles.containerDropDown}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={TypeTruck}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onChange={(value) => {
                  setTruckInfo({ ...truckInfo, typetruck: value.value });
                }}
              />
            </View>
          </View>

        </View>
        <View>
        </View>
        <View style={{ flex: 6 }}>
          <View style={styles.displayData}>
            {filteredTruck().length > 0 ? (
              <FlatList
                style={styles.list}
                data={filteredTruck()}
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
        <View style={{ flex: 0.5, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddTruck", {
                truckInfo: truckInfo,
              });
            }}
          >
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
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

export default HomeTruck;
