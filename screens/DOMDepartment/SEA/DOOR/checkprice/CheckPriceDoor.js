import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import color from "../../../../../contains/color";
import clientSeaDoor from "../../../../../api/clientSeaDoor";
import clientCheckPriceDoor from "../../../../../api/clientCheckPriceDoor";

const CheckPriceDoor = ({ navigation }) => {
  const [seaDoorInfo, setSeaDoorInfo] = useState({
    month: "",
    continent: "",
    year: "",
    container: "",
    doortype: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  //   useEffect(() => {
  //     data.map((item) => console.log(item.shippingtype));
  //   }, []);
  // call api get Log
  useEffect(() => {
    clientCheckPriceDoor
      .get("/getAll")
      .then((res) => {
        setData(res.data.checkPriceDoor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const checkTypeSearch = (searchText, eachSeaCy) => {
    let result = false;
    if (
      eachSeaCy.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachSeaCy.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachSeaCy.productname.toLowerCase().includes(searchText.toLowerCase()) ||
      eachSeaCy.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredSeaDoor = () =>
    data.filter(
      (eachSeaDoor) =>
        eachSeaDoor.month
          .toLowerCase()
          .includes(seaDoorInfo.month.toLowerCase()) &&
        eachSeaDoor.continent
          .toLowerCase()
          .includes(seaDoorInfo.continent.toLowerCase()) &&
        eachSeaDoor.container
          .toLowerCase()
          .includes(seaDoorInfo.container.toLowerCase()) &&
        eachSeaDoor.doortype
          .toLowerCase()
          .includes(seaDoorInfo.doortype.toLowerCase()) &&
        checkTypeSearch(searchText, eachSeaDoor)
      // && checkPriceSearch(eachLog)
    );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          "Thông Báo",
          "Bạn có muốn tạo một báo giá mới theo yêu cầu sale không?",
          [
            {
              text: "Hủy",
              onPress: () => console.log("Cancel required"),
              style: "cancel",
            },
            {
              text: "Phản hồi",
              onPress: () => {
                navigation.navigate("AddDoorRequiteSale", {
                  item: item,
                });
              },
            },
          ]
        );
      }}
    >
      <View style={styles.detail}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Tên Hàng: </Text>
          <Text style={styles.textDisplay}>{item.productname}</Text>
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
          <Text style={styles.textLable}>Loại Container: </Text>
          <Text style={styles.textDisplay}>{item.container}</Text>
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
      <View style={{ flex: 9 }}>
        <View style={styles.displayData}>
          {filteredSeaDoor().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredSeaDoor()}
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
            navigation.navigate("AddCheckPriceDoor");
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
export default CheckPriceDoor;
