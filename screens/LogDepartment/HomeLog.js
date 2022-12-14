import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  RefreshControl
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Dropdown } from "react-native-element-dropdown";
import color from "../../contains/color";
import clientLog from "../../api/clientLog";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  BetweenPrice1,
  Month1,
  ShippingType,
  Year1,
} from "../../contains/constant";
// import { useQuery } from '@tanstack/react-query'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeLog = ({ navigation }) => {
  const [logInfo, setLogInfo] = useState({
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
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    navigation.replace('HomeTabLog')
    // alert('refresh')
    // console.log('refreshed')
    wait(500).then(() => setRefreshing(false));
  }, [])

  const getData = async () => {
    await clientLog
      .get("/getAll")
      .then((res) => {
        setData(res.data.phongLogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData()
  }, []);

  // const getLogQuery = useQuery(['getLogQuery'], getData, {
  //   refetchOnWindowFocus: false,
  //   cacheTime: 0,
  // })
  // const { dataaaa } = getLogQuery
  // console.log('logData', dataaaa);

  const checkPriceSearch = (eachLog) => {
    let result = false;
    const end = logInfo.beweenprice.indexOf("đến");
    const value1 = logInfo.beweenprice.substring(3, end - 1);
    const value2 = logInfo.beweenprice.substring(end + 4);
    if (eachLog.price > value1 && eachLog.price < value2) {
      result = true;
    } else if (logInfo.beweenprice == "") {
      result = true;
    }

    return result;
  };

  const checkTypeSearch = (searchText, eachLog) => {
    let result = false;
    if (
      eachLog.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLog.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLog.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLog.name.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLog.code.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredLog = () =>
    data.filter(
      (eachLog) =>
        eachLog.month.toLowerCase().includes(logInfo.month.toLowerCase()) &&
        eachLog.freight.toLowerCase().includes(logInfo.freight.toLowerCase()) &&
        checkTypeSearch(searchText, eachLog) &&
        checkPriceSearch(eachLog)
    );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailLog", {
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
          <Text style={styles.textDisplay}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>H/S Code: </Text>
          <Text style={styles.textDisplay}>{item.hsCode}</Text>
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
          <Text style={styles.textLable}>Giá: </Text>
          <Text style={styles.textDisplay}>{item.price}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Loại Hình: </Text>
          <Text style={styles.textDisplay}>{item.type}</Text>
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
                  setLogInfo({ ...logInfo, month: value.value });
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
                data={ShippingType}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onChange={(value) => {
                  setLogInfo({ ...logInfo, freight: value.value });
                }}
              />
            </View>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row", minHeight: 100 }}>
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
                setLogInfo({ ...logInfo, year: value.value });
              }}
            />
          </View>
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Khoảng Giá</Text>
          <View style={styles.containerDropDown}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={BetweenPrice1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              onChange={(value) => {
                setLogInfo({ ...logInfo, beweenprice: value.value });
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View style={{ flex: 5 }}>
        <View style={styles.displayData}>
          {filteredLog().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredLog()}
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
      <View style={{ flex: 0.5, marginTop: -10, marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddLog", {
              logInfo: logInfo,
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
const { width, height } = Dimensions.get("window");

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
    height: height * 0.46,

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

export default HomeLog;
