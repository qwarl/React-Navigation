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
import color from "../../../contains/color";
import Icon from "react-native-vector-icons/FontAwesome";
import clientAir from "../../../api/clientAir";
import clientCheckPriceAir from "../../../api/clientCheckPriceAir";

const CheckPriceAir = ({ navigation }) => {
  const [airInfo, setAirInfo] = useState({
    month: "",
    continent: "",
    year: "",
    shippingtype: "",
  });

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    clientCheckPriceAir
      .get("/getAll")
      .then((res) => {
        setData(res.data.CheckPriceAir);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const checkTypeSearch = (searchText, eachAir) => {
    let result = false;
    if (
      eachAir.aol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachAir.aod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachAir.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredAir = () =>
    data.filter(
      (eachAir) =>
        checkTypeSearch(searchText, eachAir) &&
        eachAir.month.toLowerCase().includes(airInfo.month.toLowerCase()) &&
        eachAir.continent
          .toLowerCase()
          .includes(airInfo.continent.toLowerCase()) &&
        eachAir.shippingtype
          .toLowerCase()
          .includes(airInfo.shippingtype.toLowerCase())
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
                navigation.navigate("AddAirRequiteSale", {
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
          <Text style={styles.textLable}>Aol: </Text>
          <Text style={styles.textDisplay}>{item.aol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Aod: </Text>
          <Text style={styles.textDisplay}>{item.aod}</Text>
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
      <View style={{ flex: 9 }}>
        <View style={styles.displayData}>
          {filteredAir().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredAir()}
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
      <View style={{ flex: 0.5, marginTop: -10, marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddCheckPriceAir");
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

export default CheckPriceAir;
