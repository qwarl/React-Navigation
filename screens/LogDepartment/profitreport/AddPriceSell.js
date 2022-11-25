import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  Image,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import color from "../../../contains/color";
import { CurrencyUnit } from "../../../contains/constant";
import { Dropdown } from "react-native-element-dropdown";
import FormInput from "../../../components/FormInput";

const AddPriceSell = ({ navigation }) => {
  const handleOnChangeText = (fieldName, ...values) => {
    values.length === 1
      ? setSellInfo({ ...sellInfo, [fieldName]: values[0] })
      : setSellInfo({
          ...sellInfo,
          [fieldName]: values[0],
          totalfreight: values[1],
        });
  };

  const [error, setError] = useState("");

  //handle time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //handle time picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("valid", fDate);
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const plus = function (a = 0, b = 0) {
    const num1 = Number(a);
    const num2 = Number(b);
    return num1 * num2;
  };

  const totalVND = function (a) {
    const num1 = Number(a);
    if (sellInfo.currencyunit === "USD") {
      return num1 * Number(sellInfo.usd);
    } else if (sellInfo.currencyunit === "EUR") {
      return num1 * Number(sellInfo.usd);
    }
    return num1;
  };

  const [sellInfo, setSellInfo] = useState({
    typecharge: "",
    quantity: "",
    unitprice: "",
    currencyunit: "VND",
    total: "",
    usd: "",
    eur: "",
    billnumber: "",
    vat: "",
    intomoney: "",
    totalvnd: "",
    notes: "",
  });

  console.log(sellInfo);
  const isValidForm = () => {
    if (!isValidObjectField(sellInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientImport.post("/create", { ...sellInfo });
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
    // }
  };
  return (
    <View style={StyleSheet.container}>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ScrollView>
        <FormInput
          label="Loại Phí"
          placeholder="Loại Phí"
          onChangeText={(value) => handleOnChangeText("typecharge", value)}
          value={sellInfo.typecharge}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.labelExchangeRate}>Tỉ Giá Bán</Text>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textUSD}>+ USD:</Text>
              <TextInput
                style={styles.textInputExchangeRate}
                placeholder="Nhận Tỉ giá"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleOnChangeText("usd", value, plus(value, sellInfo.usd));
                }}
                value={sellInfo.quantity}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text style={styles.textUSD}>+ EUR:</Text>
              <TextInput
                style={styles.textInputExchangeRate}
                placeholder="Nhận Tỉ giá"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleOnChangeText("eur", value, plus(value, sellInfo.eur));
                }}
                value={sellInfo.eur}
              />
            </View>
          </View>
        </View>
        <FormInput
          label="Loại Phí"
          placeholder="Loại Phí"
          onChangeText={(value) => handleOnChangeText("typecharge", value)}
          value={sellInfo.typecharge}
        />
        <FormInput
          label="Số Lượng"
          placeholder="Số Lượng"
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChangeText(
              "quantity",
              value,
              plus(value, sellInfo.quantity)
            );
          }}
          value={sellInfo.quantity}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            <FormInput
              label="Đơn Giá"
              placeholder="Đơn Giá"
              keyboardType="numeric"
              onChangeText={(value) => {
                handleOnChangeText(
                  "unitprice",
                  value,
                  plus(value, sellInfo.unitprice)
                );
              }}
              value={sellInfo.unitprice}
            />
          </View>
          <View style={styles.dropMenu}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={CurrencyUnit}
              search={true}
              defau
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={sellInfo.currencyunit}
              onChange={(value) => {
                setSellInfo({ ...sellInfo, currencyunit: value.value });
              }}
            />
          </View>
        </View>
        <FormInput
          label="Total"
          placeholder="Total"
          value={`${Number(sellInfo.quantity) * Number(sellInfo.unitprice)}`}
        />
        <FormInput
          placeholder="VAT"
          label="VAT"
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChangeText("vat", value, plus(value, sellInfo.vat));
          }}
          value={sellInfo.vat}
        />
        <FormInput
          placeholder="Thành tiền"
          label="Thành Tiền"
          value={`${
            Number(sellInfo.unitprice) +
            Number(sellInfo.unitprice) * (sellInfo.vat / 100)
          }`}
        />
        <FormInput placeholder="Total (VND)" label="Total (VND)" value={""} />
        <FormInput
          placeholder="Số Hóa Đơn"
          label="Số Hóa Đơn"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeText("billnumber", value)}
          value={sellInfo.billnumber}
        />
        <FormInput
          placeholder="Note"
          label="Note"
          value={sellInfo.notes}
          onChangeText={(value) => handleOnChangeText("notes", value)}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Thêm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  dropMenu: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flex: 1,
    width: 100,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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
  buttonTime: {
    height: 40,
    borderColor: color.colorbutton,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 80,
  },
  buttonImage: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 40,
  },
  styleButton: {
    padding: 20,
    marginLeft: 50,
  },
  styleImage: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 25,
    paddingRight: 15,
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
  validStyle: {
    height: 35,
    width: "90%",
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    height: 50,
    marginLeft: 17,
    marginRight: 17,
    borderBottomWidth: 1,
  },
  textValid: {
    fontWeight: "bold",
    marginLeft: 17,
  },
  labelExchangeRate: {
    marginLeft: 16,
    marginRight: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  textUSD: {
    marginLeft: 5,
    fontSize: 16,
    marginRight: 5,
  },
  textInputExchangeRate: {
    width: "65%",
    fontSize: 14,
    borderBottomWidth: 1,
    marginTop: -10,
  },
});

export default AddPriceSell;
