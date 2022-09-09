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

  useEffect(() => {
      clientLog.get('/getAll')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 4,
          justifyContent: "space-between",
          marginBottom: 50,
          flexDirection: "row",
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.dropMenu}>
              <Text style={styles.label}>Chọn Tháng</Text>
              <SelectList
                setSelected={(value) =>
                  setLogInfo({ ...logInfo, month: value })
                }
                data={Month}
              />
            </View>
            <View style={styles.dropMenu}>
              <Text style={styles.label}>Loại Vận Chuyển</Text>
              <SelectList
                setSelected={(value) =>
                  setLogInfo({ ...logInfo, month: value })
                }
                data={ShippingType}
              />
            </View>
          </View>
          <View style={styles.displayData}>
            {/* <TouchableOpacity  onPress={() => {
            navigation.navigate("DetailLog", {
              logInfo: logInfo,
            });
          }} >
              <Text style={{marginLeft:90, marginTop:50}}>Send data</Text>
            </TouchableOpacity> */}
              <FlatList style={styles.list}/>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
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
    minWidth: 180,
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
    marginBottom: 0,
  },
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  displayData:{
    flex:1,
  },
  list:{
    flex:1,
    padding:8
  },

});

export default HomeLog;
