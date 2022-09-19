import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectList from "react-native-dropdown-select-list";
import color from "../../contains/color";
import clientLog from "../../api/clientLog";
import Icon from "react-native-vector-icons/FontAwesome";
import { Month, ShippingType } from "../../contains/constant";

const HomeLog = ({ navigation }) => {
  const [logInfo, setLogInfo] = useState({
    month: "",
    freight: "",
  });
  const [data, setData] = useState([]);
  // const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    clientLog
      .get("/getAll")
      .then((res) => {
        setData(res.data.phongLogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkTypeSearch = (searchText, eachLog) => {
    let result = false;
    if (
      eachLog.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLog.pod.toLowerCase().includes(searchText.toLowerCase())
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
        checkTypeSearch(searchText, eachLog)
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
      <View style={{ flexDirection: "row", minHeight: 100 }}>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Tháng</Text>
          <SelectList
            setSelected={(value) => setLogInfo({ ...logInfo, month: value })}
            data={Month}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
              fontSize: 28,
              fontWeight: "bold",
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Vận Chuyển</Text>
          <SelectList
            setSelected={(value) => setLogInfo({ ...logInfo, freight: value })}
            data={ShippingType}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 9 }}>
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
                Không có dữ liệu cảng đi tên {searchText}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  dropMenu: {
    paddingHorizontal: 10,
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
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: color.colorbutton,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: color.background,
    position: "absolute",
    right: 10,
    marginBottom: 20,
    marginTop: -40,
  },
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
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
});

export default HomeLog;
