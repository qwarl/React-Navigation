import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../../../contains/color";
import clientCheckPriceImportLCL from "../../../../api/clientCheckPriceImportLCL";

const CheckPriceImportLCL = ({ navigation }) => {
  const [importLCLInfo, setImportLCLInfo] = useState({
    month: "",
    continent: "",
    year: "",
    container: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   data.map((item) => console.log(item.shippingtype));
  // }, []);
  // call api get Log
  useEffect(() => {
    clientCheckPriceImportLCL
      .get("/getAll")
      .then((res) => {
        setData(res.data.checkPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const checkTypeSearch = (searchText, eachImportLCL) => {
    let result = false;
    if (
      eachImportLCL.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachImportLCL.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachImportLCL.code.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredImport = () =>
    data.filter(
      (eachImportLCL) =>
        eachImportLCL.month
          .toLowerCase()
          .includes(importLCLInfo.month.toLowerCase()) &&
        eachImportLCL.continent
          .toLowerCase()
          .includes(importLCLInfo.continent.toLowerCase()) &&
        eachImportLCL.cargo
          .toLowerCase()
          .includes(importLCLInfo.container.toLowerCase()) &&
        checkTypeSearch(searchText, eachImportLCL)
      // && checkPriceSearch(eachLog)
    );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert("Thông Báo", "Bạn có muốn tạo một báo giá mới theo yêu cầu sale không?", [
          {
            text: "Hủy",
            onPress: () => console.log("Cancel required"),
            style: "cancel",
          },
          {
            text: "Phản hồi",
            onPress: () => {
              navigation.navigate("AddRequiteSale", {
                item: item,
              });
            },
          },
        ]);
      }}
    >
      <View style={styles.detail}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pol: </Text>
          <Text style={styles.textDisplay}>{item.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pod: </Text>
          <Text style={styles.textDisplay}>{item.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Cargo: </Text>
          <Text style={styles.textDisplay}>{item.cargo}</Text>
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <View style={styles.displayData}>
          {filteredImport().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredImport()}
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
          justifyContent: "center",
          marginTop: -10,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddCheckPriceImportLCL");
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
    backgroundColor: color.backgrounDisplayDetail,
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
  },
});

export default CheckPriceImportLCL;
