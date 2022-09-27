import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import color from "../../contains/color";
import { Continent, Month, Year, BeweenPrice } from "../../contains/constant";
import SelectList from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const url = `http://192.168.1.82:3001/api/quotations/getAll`;
    axios.get(url).then((res) => {
      setData1(res.data.quotations);
    });
  }, [data1]);

  const [fclInfo, setFCLInfo] = useState({
    month: "",
    continent: "",
    year: "",
    beweenprice: "",
    type: "",
  });
  const [searchText, setSearchText] = useState("");
  // data1.map(item => console.log(item.month))
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
        navigation.navigate("DetailLog", {
          item: item,
        });
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
    const end = fclInfo.beweenprice.indexOf("đến");
    const value1 = fclInfo.beweenprice.substring(3, end - 1);
    const value2 = fclInfo.beweenprice.substring(end + 4);
    if (eachFcl.price > value1 && eachFcl.price < value2) {
      result = true;
    } else if (fclInfo.beweenprice == "") {
      result = true;
    }

    return result;
  };

  const checkTypeSearch = (searchText, eachFcl) => {
    let result = false;
    if (
      eachFcl.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachFcl.pod.toLowerCase().includes(searchText.toLowerCase())
      //   ||
      //   eachLog.hsCode.toLowerCase().includes(searchText.toLowerCase())||
      //   eachLog.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredFCL = () =>
    data1.filter(
      (eachFcl) =>
        eachFcl.month.toLowerCase().includes(fclInfo.month.toLowerCase()) &&
        eachFcl.continent.toLowerCase().includes(fclInfo.continent.toLowerCase()) &&
        checkTypeSearch(searchText, eachFcl) &&
        checkPriceSearch(eachFcl)
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="search"
          size={25}
          color="black"
          style={{ position: "absolute", top: 20, left: 30 }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Nhập từ khóa tìm kiếm"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) => setFCLInfo({ ...fclInfo, month: value })}
            data={Month}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
              fontSize: 28,
              fontWeight: "bold",
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <SelectList
            setSelected={(value) =>
              setFCLInfo({ ...fclInfo, continent: value })
            }
            data={Continent}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", minHeight: 100 }}>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Năm</Text>
          <SelectList
            setSelected={(value) => setFCLInfo({ ...fclInfo, year: value })}
            data={Year}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
              fontSize: 28,
              fontWeight: "bold",
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Khoảng Giá</Text>
          <SelectList
            setSelected={(value) =>
              setFCLInfo({ ...fclInfo, beweenprice: value })
            }
            data={BeweenPrice}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
            }}
          />
        </View>
      </View>

      {/* <View style={{ flexDirection: "row" }}>
        <RadioButton.Group
          onValueChange={(value) => setFCLInfo({ ...fclInfo, type: value })}
          value={fclInfo.type}
        >
          <RadioButton.Item label="GP" value="GP" />
          <RadioButton.Item label="RF" value="RF" />
          <RadioButton.Item label="FR" value="FR" />
          <RadioButton.Item label="OT" value="OT" />
          <RadioButton.Item label="HC" value="HC" />
        </RadioButton.Group>
      </View> */}
      <View style={{flex:6}}>
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
          flex: 0.4,
          justifyContent: "center",
          marginTop: -20,
          marginBottom: 40,
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
  listContainer: {
    backgroundColor: "b",
    // flexDirection:'row',
    margin: (width * 3.6) / 187.5,
    padding: (width * 3.6) / 187.5,
    borderRadius: (width * 3.6) / 187.5,
    width: "100%",
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
  detail: {
    borderRadius: 15,
    borderColor: "#000",
    backgroundColor: color.backgrounDisplayData,
    marginBottom: 10,
    padding: 5,
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
});

export default Home;