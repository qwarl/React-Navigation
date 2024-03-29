import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../contains/color";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Dropdown } from "react-native-element-dropdown";
import {
  BetweenPrice1,
  ContainerHome,
  ContainerImport,
  Continent,
  Month1,
  Year1,
} from "../../../contains/constant";
import clientImport from "../../../api/clientImport";

const HomeImport = ({ navigation }) => {
  const [importInfo, setImportInfo] = useState({
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
    clientImport
      .get("/getAll")
      .then((res) => {
        setData(res.data.dataImport);
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

  const checkTypeSearch = (searchText, eachImport) => {
    let result = false;
    if (
      eachImport.pol.toLowerCase().includes(searchText.toLowerCase()) ||
      eachImport.pod.toLowerCase().includes(searchText.toLowerCase()) ||
      eachImport.code.toLowerCase().includes(searchText.toLowerCase())
      // || eachAir.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // eachAir.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result = true;
    }
    return result;
  };

  const filteredImport = () =>
    data.filter(
      (eachImport) =>
        eachImport.month
          .toLowerCase()
          .includes(importInfo.month.toLowerCase()) &&
        eachImport.continent
          .toLowerCase()
          .includes(importInfo.continent.toLowerCase()) &&
        eachImport.container
          .toLowerCase()
          .includes(importInfo.container.toLowerCase()) &&
        checkTypeSearch(searchText, eachImport)
      // && checkPriceSearch(eachLog)
    );

    function clearFilter() {
      // setFCLInfo({ ...fclInfo, month: '', continent: '', type: '' })
      // setSearchText('')
      // RNRestart.Restart()
      // DevSettings.reload()
      // await Updates.reloadAsync()
      // Updates.reloadAsync()
      navigation.reset({ index: 0, routes: [{ name: 'ScreenImport' }] })
      // setTimeout(Updates.reloadAsync, 1000)
    }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailImport", {
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
          <Text style={styles.textLable}>Loại Container: </Text>
          <Text style={styles.textDisplay}>{item.container}</Text>
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
          size={28}
          color="white"
          style={{ position: "absolute", top: 20, left: 30, zIndex: 1000 }}
        />
        <TextInput
          style={styles.styleSearch}
          placeholder="Tìm kiếm"
          placeholderTextColor={"white"}
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
          <View style={styles.containerDropDown}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Month1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              onChange={(value) => {
                setImportInfo({ ...importInfo, month: value.value });
              }}
            />
          </View>
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Châu</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Continent}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={(value) => {
              setImportInfo({ ...importInfo, continent: value.value });
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", minHeight: 100 }}>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Chọn Năm</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Year1}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={(value) => {
              setImportInfo({ ...importInfo, year: value.value });
            }}
          />
        </View>
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Khoảng Giá</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={BetweenPrice1}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={(value) => {
              setImportInfo({ ...importInfo, betweenprice: value.value });
            }}
          />
        </View>
      </View>
      <View>
        <RadioForm
          formHorizontal={true}
          style={{ marginLeft: 10 }}
          labelStyle={{ fontSize: 20, marginRight: 8 }}
          buttonSize={8}
          buttonColor={"black"}
          radio_props={ContainerImport}
          initial={-1}
          onPress={(val) =>
            setImportInfo({
              ...importInfo,
              container: ContainerImport[val].label,
            })
          }
        />
        <Button title='Clear' onPress={clearFilter} />
      </View>
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
            navigation.navigate("AddImport");
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

export default HomeImport;
