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
import clientLCL from "../../../api/clientLCL";
import { Continent, Month1 } from "../../../contains/constant";
import { Dropdown } from "react-native-element-dropdown";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeLCL = ({ navigation }) => {
  const [lclInfo, setLCLInfo] = useState({
    month: "",
    continent: "",
    year: "",
    beweenprice: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    navigation.replace('HomeTabLCL')
    // alert('refresh')
    // console.log('refreshed')
    wait(500).then(() => setRefreshing(false));
  }, [])
  useEffect(() => {
    data.map((item) => console.log(item.shippingtype));
  }, []);
  // call api get Log
  useEffect(() => {
    clientLCL
      .get("/getAll")
      .then((res) => {
        setData(res.data.lcl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const checkDropdownValue = (eachAir) => {
    let result = false;
    if (
      eachAir.shippingtype
        .toLowerCase()
        .includes(airInfo.shippingtype.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const checkTypeSearch = (searchText, eachLCL) => {
    let result = false;
    if (
      eachLCL.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLCL.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLCL.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredLCL = () =>
    data.filter(
      (eachLCL) =>
        eachLCL.month.toLowerCase().includes(lclInfo.month.toLowerCase()) &&
        eachLCL.continent
          .toLowerCase()
          .includes(lclInfo.continent.toLowerCase()) &&
        checkTypeSearch(searchText, eachLCL)
      // && checkPriceSearch(eachLog)
    );


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailLCL", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <View>
          <Text style={styles.textDisplayCode}>{item.code}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pol: </Text>
          <Text style={styles.textDisplay}>{item.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pod: </Text>
          <Text style={styles.textDisplay}>{item.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Dim: </Text>
          <Text style={styles.textDisplay}>{item.dim}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Schedule: </Text>
          <Text style={styles.textDisplay}>{item.schedule}</Text>
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
                  setLCLInfo({ ...lclInfo, month: value.value });
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
                  setLCLInfo({ ...lclInfo, continent: value.value });
                }}
              />
            </View>
          </View>
        </View>
        <View>
        </View>
        <View style={{ flex: 5 }}>
          <View style={styles.displayData}>
            {filteredLCL().length > 0 ? (
              <FlatList
                style={styles.list}
                data={filteredLCL()}
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
              navigation.navigate("AddLCL", {
                lclInfo: lclInfo,
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

export default HomeLCL;
