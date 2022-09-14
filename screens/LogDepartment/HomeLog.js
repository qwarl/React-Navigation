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
import { Month } from "../../contains/month";
import { ShippingType } from "../../contains/ShippingType";
import color from "../../contains/color";
import clientLog from "../../api/clientLog";
import axios from "axios";
import FormInput from "../../components/FormInput";
import Search from "../../components/Search";

const HomeLog = ({ navigation }) => {
  const [logInfo, setLogInfo] = useState({
    month: "",
    freight: "",
  });

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(data)
    clientLog
      .get("/getAll")
      .then((res) => {
        // console.log(res);
        setData(res.data.phongLogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("search");
    const filterData = data.filter((item) =>
      item.pol.toLowerCase().includes(search.toLowerCase())
    );
    setData(filterData);
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailLog", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <Text style={styles.textDisplay}>Tên Hàng: {item.name}</Text>
        <Text style={styles.textDisplay}>H/S Code: {item.hsCode}</Text>
        <Text style={styles.textDisplay}>Cảng Đi: {item.pol}</Text>
        <Text style={styles.textDisplay}>Cảng Đến: {item.pod}</Text>
        <Text style={styles.textDisplay}>Giá: {item.price}</Text>
        <Text style={styles.textDisplay}>Loại Hình: {item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/* <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Chọn Tháng</Text>
            <SelectList
              setSelected={(value) => setLogInfo({ ...logInfo, month: value })}
              data={Month}
              dropdownStyles={{
                backgroundColor: "#D9DBDB",
              }}
            />
          </View>
          <View style={styles.dropMenu}>
            <Text style={styles.label}>Loại Vận Chuyển</Text>
            <SelectList
              setSelected={(value) => setLogInfo({ ...logInfo, month: value })}
              data={ShippingType}
              dropdownStyles={{
                backgroundColor: "#D9DBDB",
              }}
            />
          </View>
        </View>
      </View> */}
      <View>
        {/* <FormInput
          placeholder="Search"
          value={logInfo.search}
          onChangeText={(value) => handleOnChangeText(value, "search")}
        /> */}
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Nhập từ khóa tìm kiếm"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={{ flex: 9 }}>
        <View style={styles.displayData}>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
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
    paddingHorizontal: 20,
    paddingVertical: 4,
    flex: 1,
    minWidth: 190,
    minHeight: 200,
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
    backgroundColor: color.primary,
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
    padding: 30,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  detail: {
    borderRadius: 15,
    borderColor: "#000",
    backgroundColor: "#B1B5B5",
    marginBottom: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1.5,
    paddingLeft: 20,
    margin: 10,
    borderColor: "#009688",
  },
  backgroundColor: "white",
});

export default HomeLog;
