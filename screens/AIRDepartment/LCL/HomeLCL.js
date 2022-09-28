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
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../../contains/color";
import {
  BeweenPrice,
  Continent,
  Month,
  Year,
} from "../../../contains/constant";
import clientLCL from "../../../api/clientLCL";

const HomeLCL = ({ navigation }) => {
  const [lclInfo, setLCLInfo] = useState({
    month: "",
    continent: "",
    year: "",
    beweenprice: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    data.map((item) => console.log(item.shippingtype));
  }, []);
  // call api get Log
  useEffect(() => {
    clientLCL
      .get("/getAll")
      .then((res) => {
        setData(res.data.lcl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const checkDropdownValue = (eachAir) => {
    let result = false;
    if (
      eachAir.shippingtype
        .toLowerCase()
        .includes(airInfo.shippingtype.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const checkTypeSearch = (searchText, eachLCL) => {
    let result = false;
    if (
      eachLCL.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLCL.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachLCL.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredLCL = () =>
    data.filter(
      (eachLCL) =>
        eachLCL.month.toLowerCase().includes(lclInfo.month.toLowerCase()) &&
        eachLCL.continent
          .toLowerCase()
          .includes(lclInfo.continent.toLowerCase()) &&
        checkTypeSearch(searchText, eachLCL)
      // && checkPriceSearch(eachLog)
    );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailLCL", {
          item: item,
        });
      }}
    >
      <View style={styles.detail}>
        <View>
          <Text style={styles.textDisplayCode}>{item.code}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pol: </Text>
          <Text style={styles.textDisplay}>{item.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLable}>Pod: </Text>
          <Text style={styles.textDisplay}>{item.pod}</Text>
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
            setSelected={(value) => setLCLInfo({ ...lclInfo, month: value })}
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
              setLCLInfo({ ...lclInfo, continent: value })
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
            setSelected={(value) => setLCLInfo({ ...lclInfo, year: value })}
            data={Year}
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
            setSelected={(value) =>
              setLCLInfo({ ...lclInfo, beweenprice: value })
            }
            data={BeweenPrice}
            dropdownStyles={{
              backgroundColor: "#D9DBDB",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 9 }}>
        <View style={styles.displayData}>
          {filteredLCL().length > 0 ? (
            <FlatList
              style={styles.list}
              data={filteredLCL()}
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
      <View style={{ flex: 0.5 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddLCL", {
              lclInfo: lclInfo,
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
  textDisplayCode: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 17,
    fontWeight: "500",
  },
});

export default HomeLCL;
