import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Button,
  RefreshControl
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import color from "../../contains/color";
import {
  Continent,
  Month,
  Month1,
  Year,
  Year1,
  BetweenPrice1,
  ContainerHome,
  ipAddress,
} from "../../contains/constant";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Dropdown } from "react-native-element-dropdown";
import { useIsFocused } from '@react-navigation/native'
import * as Updates from "expo-updates"

const { width, height } = Dimensions.get("window");

const Home = ({ navigation, route }) => {
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

  function getData() {
    const url = `/api/quotations/getAll`;
    axios.get(ipAddress + url).then((res) => {
      setData1(res["data"].quotations);
    });
  }
  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused && getData();
  }, [isFocused]);

  const [searchText, setSearchText] = useState("");
  // console.log(data1.container);
  const ListItem = ({ item }) => {
    // console.log('month', item.month);
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Add", item)}>
        <Text style={{ marginLeft: 10, fontSize: 20 }}>
          Tháng: {item.month}
        </Text>
        <Text style={styles.item}>Cảng đi: {item.pol}</Text>
        <Text style={styles.item}>Cảng đến: {item.pod}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <View>
          <Text style={styles.textDisplayCode}>{item.code}</Text>
        </View>
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
      eachFcl.code.toLowerCase().includes(searchText.toLowerCase())
      // ||
      // eachFcl.carrier.toLowerCase().includes(searchText.toLowerCase())
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

  function clearFilter() {
    // setFCLInfo({ ...fclInfo, month: '', continent: '', type: '' })
    // setSearchText('')
    // RNRestart.Restart()
    // DevSettings.reload()
    // await Updates.reloadAsync()
    // Updates.reloadAsync()
    navigation.reset({ index: 0, routes: [{ name: 'ScreenFCL' }] })
    // setTimeout(Updates.reloadAsync, 1000)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
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
                setFCLInfo({ ...fclInfo, month: value.value });
              }}
            />
          </View>
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
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
              setFCLInfo({ ...fclInfo, continent: value.value });
            }}
          />
        </View>
      </View>
      <View>
        <RadioForm
          formHorizontal={true}
          style={{ marginLeft: 20, marginVertical: 10 }}
          labelStyle={{ fontSize: 20, marginRight: 15 }}
          buttonSize={11}
          buttonColor={"black"}
          radio_props={ContainerHome}
          initial={-1}
          onPress={(val) =>
            setFCLInfo({ ...fclInfo, type: ContainerHome[val].label })
          }
        />
        <Button title='Clear' onPress={clearFilter} />
        {/* <Button title='Clear' onPress={navigation.reset('Home')} /> */}
      </View>

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
            navigation.navigate("Add");
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

export default Home;
