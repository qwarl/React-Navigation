import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectList from "react-native-dropdown-select-list";
import { Month } from "../../contains/month";
import { ShippingType } from "../../contains/ShippingType";
import color from "../../contains/color";
import clientLog from "../../api/clientLog";
import axios from "axios";

const HomeLog = ({ navigation }) => {
  const [logInfo, setLogInfo] = useState({
    month: "",
    freight: "",
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clientLog
      .get("/getAll")
      .then((res) => {
        // console.log(res);
        setData(res.data.phongLogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  // console.log(data);

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
    <View style={{ flex: 1 }}>
      <View
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
      </View>
       <View style={{ flex: 8 }}>
        <View style={styles.displayData}>
          {/* { <TouchableOpacity  onPress={() => {
            navigation.navigate("DetailLog", {
              logInfo: logInfo,
            });
          }} >
              <Text style={{marginLeft:90, marginTop:50}}>Send data</Text>
            </TouchableOpacity> } */}
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View> 
      <View style={{ flex: 1 }}>
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
    zIndex: 1000
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
    marginBottom: 30,
    marginTop: 10,
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
});

export default HomeLog;
