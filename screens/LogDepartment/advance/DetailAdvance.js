import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../contains/color";
import Icon from "react-native-vector-icons/Entypo";
import clientAdvanceOPS from "../../../api/clientAdvanceOPS";

// expo add expo-file-system expo-sharing xlsx
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
const DetailAdvance = () => {
  const [data, setData] = useState([]);
  const [ops, setOps] = useState({ ops: "", userCreate: "Mr Thắng" });
  const url = "/getAll";
  const id = "Mr Thắng";

  useEffect(() => {
    clientAdvanceOPS
      .get(url)
      .then((res) => {
        setData(res.data.advanceOPS);
        // console.log(data[0].ops);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const totalOps = data
  //   .map((item) => Number(item.money))
  //   .reduce((prev, curr) => prev + curr, 0);

  // console.log(totalOps);
  // const newArray = () => {
  //   var numbers = [];
  //   for (var i = 0; i < data.length; i++) {
  //     var money = data[i].money;
  //     var username = data[i].username;
  //     var reason = data[i].reason;
  //     var status = data[i].status;
  //     var date = data[i].date;
  //     numbers.push([money, username, reason, status, date]);
  //   }
  // for (var i = 0; i < numbers.length; i++) {
  //   let row = numbers[i];
  //   let row1 = [];
  //   row1.push(row);
  //   const [childRow] = row1;
  //   // console.log(row1);
  //   return childRow;
  // }
  //   return numbers;
  // };

  const generateExcel = () => {
    let row4 = newArray(); // [[1,2,3], [4,5]]

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["Số Tiền", "Người Ứng", "Lí Do Ứng", "Tình Trạng", "Ngày Ứng"],
      ...row4,
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    var date = new Date();
    const filename =
      FileSystem.documentDirectory +
      date.getFullYear() +
      (date.getMonth() + 1) +
      date.getDate() +
      date.getHours() +
      date.getMinutes() +
      "OPS.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };
  // let obj = JSON.parse(data);

  // console.log(obj);

  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      // const url = "/delete/";
      // const res = await clientAdvanceOPS.post("/create", { ...ops });
      // if (res.data.success) {
      var numbers = [];
      for (var i = 0; i < data.length; i++) {
        var money = data[i].money;
        var username = data[i].username;
        var reason = data[i].reason;
        var status = data[i].status;
        var date = data[i].date;
        numbers.push([money, username, reason, status, date]);
        // console.log(numbers);
      }
      for (var i = 0; i <= numbers.length; i++) {
        let row = numbers[i];
        let row1 = [];
        row1.push(row);
        const [childRow] = row1;
        console.log(childRow);
      }
      Alert.alert("Thêm Thành Công");
      // navigation.replace("DrawerScreen");
      // }
    } catch (error) {
      console.log(error.message);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.navigate("AdvanceLog", {
    //     item: item,
    //   });
    // }}
    >
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Người ứng: </Text>
          <Text style={styles.textDisplay}>{item.username}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Lý do ứng: </Text>
          <Text style={styles.textDisplay}>{item.reason}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Ngày ứng: </Text>
          <Text style={styles.textDisplay}>{item.date}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Số tiền: </Text>
          <Text style={styles.textDisplay}>{item.money}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Tình trạng: </Text>
          <Text style={styles.textDisplay}>{item.status}</Text>
        </View>
      </View>
      <Text
        style={{
          height: 1,
          borderWidth: 2,
          borderColor: "#D8D8D8",
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.white,
        marginTop: 40,
      }}
    >
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 20,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            color: color.primary,
          }}
        >
          Tạm Ứng OPS
        </Text>
        {/* <Icon
          onPress={() => navigation.navigate("AddAdvance")}
          name="add-to-list"
          size={35}
          color="#000"
          style={{
            top: -5,
            position: "absolute",
            right: -110,
            marginBottom: 0,
            zIndex: 1000,
          }}
        /> */}
      </View>
      <View style={styles.displayData}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          marginVertical: 30,
          marginHorizontal: 80,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <TouchableOpacity style={[styles.buttonInsert]} onPress={generateExcel}>
          <Text
            style={{
              fontSize: 18,
              color: color.primary,
              fontWeight: "bold",
            }}
          >
            Xuất File Excel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailAdvance;

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
  buttonInsert: {
    height: 50,
    width: 150,
    borderColor: color.borderColor,
    borderWidth: 1.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 10,
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
    marginRight: 20,
  },
  displayData: {
    flex: 9,
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
