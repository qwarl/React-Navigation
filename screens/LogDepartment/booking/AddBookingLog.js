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
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { Container, Type } from "../../../contains/constant";
import color from "../../../contains/color";
import FormInput from "../../../components/FormInput";
import clientBookingLog from "../../../api/clientBookingLog";

const AddBookingLog = ({ navigation, route }) => {
  const handleOnChangeText = (fieldName, ...values) => {
    values.length === 1
      ? setBookingInfo({ ...bookingInfo, [fieldName]: values[0] })
      : setBookingInfo({
          ...bookingInfo,
          [fieldName]: values[0],
          totalfreight: values[1],
        });
  };

  const [error, setError] = useState("");

  //handle time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState("date");
  const [show2, setShow2] = useState(false);

  const [date3, setDate3] = useState(new Date());
  const [mode3, setMode3] = useState("date");
  const [show3, setShow3] = useState(false);

  const [date4, setDate4] = useState(new Date());
  const [mode4, setMode4] = useState("date");
  const [show4, setShow4] = useState(false);

  const [date5, setDate5] = useState(new Date());
  const [mode5, setMode5] = useState("date");
  const [show5, setShow5] = useState(false);

  const [date6, setDate6] = useState(new Date());
  const [mode6, setMode6] = useState("date");
  const [show6, setShow6] = useState(false);
  //handle time picker
  const onChangeDeclaration = (event, selectedDate) => {
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

    handleOnChangeText("daydeclaration", fDate);
  };

  const onChangeDayGo = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow1(Platform.OS === "ios");
    setDate1(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("daygo", fDate);
  };

  const onChangeDayArrive = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === "ios");
    setDate2(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("dayarrive", fDate);
  };

  const onChangeSalesContract = (event, selectedDate) => {
    const currentDate = selectedDate || date3;
    setShow3(Platform.OS === "ios");
    setDate3(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("daysalescontract", fDate);
  };
  const onChangeInvoice = (event, selectedDate) => {
    const currentDate = selectedDate || date4;
    setShow4(Platform.OS === "ios");
    setDate4(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("dayinvoice", fDate);
  };
  const onChangePacking = (event, selectedDate) => {
    const currentDate = selectedDate || date5;
    setShow5(Platform.OS === "ios");
    setDate5(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("daypacking", fDate);
  };
  const onChangeBillBooking = (event, selectedDate) => {
    const currentDate = selectedDate || date6;
    setShow6(Platform.OS === "ios");
    setDate6(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    handleOnChangeText("daybillbooking", fDate);
  };

  //handle time picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };
  const showMode3 = (currentMode) => {
    setShow3(true);
    setMode3(currentMode);
  };
  const showMode4 = (currentMode) => {
    setShow4(true);
    setMode4(currentMode);
  };
  const showMode5 = (currentMode) => {
    setShow5(true);
    setMode5(currentMode);
  };
  const showMode6 = (currentMode) => {
    setShow6(true);
    setMode6(currentMode);
  };

  const plus = function (a = 0, b = 0) {
    const num1 = Number(a);
    const num2 = Number(b);
    return num1 + num2;
  };

  let { type, pol, pod, code, typeProduct, name } = route?.params.data || {};

  const [bookingInfo, setBookingInfo] = useState({
    code: code,
    month: "",
    type: type,
    customer: "",
    numberdeclaration: "",
    daydeclaration: "",
    stream: "",
    typeProduct: typeProduct,
    quantity: "",
    numberbale: "",
    baletype: "",
    weight: "",
    container: "",
    numbercotainer: "",
    name: name,
    supplier: "",
    supplier1: "",
    supplier2: "",
    pol: pol,
    daygo: "",
    pod: pod,
    dayarrive: "",
    salescontract: "",
    daysalescontract: "",
    invoice: "",
    dayinvoice: "",
    packing: "",
    daypacking: "",
    billbooking: "",
    daybillbooking: "",
    debit: "",
    sales: "",
    docs: "",
  });

  // console.log(bookingInfo);
  const isValidForm = () => {
    if (!isValidObjectField(bookingInfo))
      return updateError("Nhập thiếu trường dữ liệu!", setError);
    return true;
  };
  const submitForm = async () => {
    // if (isValidForm()) {
    try {
      const res = await clientBookingLog.post("/create", {
        ...bookingInfo,
      });
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
          label="Số Báo Giá"
          placeholder="Số Báo Giá"
          onChangeText={(value) => handleOnChangeText("code", value)}
          value={bookingInfo.code}
        />
        <FormInput
          placeholder="Khách Hàng"
          label="Khách Hàng"
          onChangeText={(value) => handleOnChangeText("customer", value)}
          value={bookingInfo.customer}
        />
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Hình</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Type}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.type}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, type: value.value });
            }}
          />
        </View>
        <FormInput
          label="Số Tờ Khai"
          placeholder="Số Tờ Khai"
          onChangeText={(value) =>
            handleOnChangeText("numberdeclaration", value)
          }
          value={bookingInfo.numberdeclaration}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Tờ Khai</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn Ngày"
              label="Chọn Ngày"
              value={bookingInfo.daydeclaration}
              onChangeText={(value) =>
                handleOnChangeText("daydeclaration", value)
              }
            />
          </View>
          <Icon
            onPress={() => setShow(!show)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            desplay="default"
            onChange={onChangeDeclaration}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          label="Phân Luồng"
          placeholder="Phân Luồng"
          onChangeText={(value) => handleOnChangeText("stream", value)}
          value={bookingInfo.stream}
        />
        <FormInput
          placeholder="Loại Hàng"
          label="Loại Hàng"
          onChangeText={(value) => handleOnChangeText("typeProduct", value)}
          value={bookingInfo.typeProduct}
        />
        <FormInput
          placeholder="Số Lượng"
          label="Số Lượng"
          onChangeText={(value) => handleOnChangeText("quantity", value)}
          value={bookingInfo.quantity}
        />
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Container</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Container}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.container}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, container: value.value });
            }}
          />
        </View>
        <FormInput
          placeholder="Số Kiện"
          label="Số Kiện"
          value={bookingInfo.numberbale}
          onChangeText={(value) => handleOnChangeText("numberbale", value)}
        />
        <FormInput
          placeholder="Loại Kiện"
          label="Loại Kiện"
          value={bookingInfo.baletype}
          onChangeText={(value) => handleOnChangeText("baletype", value)}
        />
        <FormInput
          placeholder="Trọng Lượng"
          label="Trọng Lượng"
          value={bookingInfo.weight}
          onChangeText={(value) => handleOnChangeText("weight", value)}
        />
        <FormInput
          placeholder="Số Container"
          label="Số Container"
          value={bookingInfo.numbercotainer}
          onChangeText={(value) => handleOnChangeText("numbercotainer", value)}
        />
        <FormInput
          placeholder="Tên Hàng"
          label="Tên Hàng"
          value={bookingInfo.name}
          onChangeText={(value) => handleOnChangeText("name", value)}
        />
        <FormInput
          placeholder="Sales"
          label="Sales"
          value={bookingInfo.sales}
          onChangeText={(value) => handleOnChangeText("sales", value)}
        />
        <FormInput
          placeholder="Docs"
          label="Docs"
          value={bookingInfo.docs}
          onChangeText={(value) => handleOnChangeText("docs", value)}
        />
        <FormInput
          placeholder="Nhà Cung Cấp 1"
          label="Nhà Cung Cấp 1"
          value={bookingInfo.supplier}
          onChangeText={(value) => handleOnChangeText("supplier", value)}
        />
        <FormInput
          placeholder="Nhà Cung Cấp 2"
          label="Nhà Cung Cấp 2"
          value={bookingInfo.supplier1}
          onChangeText={(value) => handleOnChangeText("supplier1", value)}
        />
        <FormInput
          placeholder="Nhà Cung Cấp 3"
          label="Nhà Cung Cấp 3"
          value={bookingInfo.supplier2}
          onChangeText={(value) => handleOnChangeText("supplier2", value)}
        />
        <FormInput
          label="Pol"
          placeholder="Pol"
          onChangeText={(value) => handleOnChangeText("pol", value)}
          value={bookingInfo.pol}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Đi</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Ngày Đi"
              label="Ngày Đi"
              value={bookingInfo.daygo}
              onChangeText={(value) => handleOnChangeText("daygo", value)}
            />
          </View>
          <Icon
            onPress={() => setShow1(!show1)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date1}
            mode={mode1}
            is24Hour={true}
            desplay="default"
            onChange={onChangeDayGo}
          />
        )}
        <FormInput
          placeholder="Pod"
          label="Pod"
          onChangeText={(value) => handleOnChangeText("pod", value)}
          value={bookingInfo.pod}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Đến</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Ngày Đến"
              label="Ngày Đến"
              value={bookingInfo.dayarrive}
              onChangeText={(value) => handleOnChangeText("dayarrive", value)}
            />
          </View>
          <Icon
            onPress={() => setShow2(!show2)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show2 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date2}
            mode={mode2}
            is24Hour={true}
            desplay="default"
            onChange={onChangeDayArrive}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          placeholder="Sale Contract"
          label="Sale Contract"
          value={bookingInfo.salescontract}
          onChangeText={(value) => handleOnChangeText("salescontract", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn ngày"
              value={bookingInfo.daysalescontract}
              onChangeText={(value) =>
                handleOnChangeText("daysalescontract", value)
              }
            />
          </View>
          <Icon
            onPress={() => setShow3(!show3)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show3 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date3}
            mode={mode3}
            is24Hour={true}
            desplay="default"
            onChange={onChangeSalesContract}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          placeholder="Invoice"
          label="Invoice"
          value={bookingInfo.invoice}
          onChangeText={(value) => handleOnChangeText("invoice", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn ngày"
              value={bookingInfo.dayinvoice}
              onChangeText={(value) => handleOnChangeText("dayinvoice", value)}
            />
          </View>
          <Icon
            onPress={() => setShow4(!show4)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show4 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date4}
            mode={mode4}
            is24Hour={true}
            desplay="default"
            onChange={onChangeInvoice}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          placeholder="Packing"
          label="Packing"
          value={bookingInfo.packing}
          onChangeText={(value) => handleOnChangeText("packing", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn ngày"
              value={bookingInfo.daypacking}
              onChangeText={(value) => handleOnChangeText("daypacking", value)}
            />
          </View>
          <Icon
            onPress={() => setShow5(!show5)}
            name="calendar"
            size={35}
            color="#7F7F7F"
            style={{
              top: 30,
              position: "absolute",
              right: 20,
              marginBottom: 0,
              zIndex: 1000,
            }}
          />
        </View>
        {show5 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date5}
            mode={mode5}
            is24Hour={true}
            desplay="default"
            onChange={onChangePacking}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          placeholder="Số Bill / Booking"
          label="Số Bill / Booking"
          value={bookingInfo.billbooking}
          onChangeText={(value) => handleOnChangeText("billbooking", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn Ngày"
              label="Chọn Ngày"
              value={bookingInfo.daybillbooking}
              onChangeText={(value) =>
                handleOnChangeText("daybillbooking", value)
              }
            />
          </View>
          <TouchableOpacity>
            <Icon
              onPress={() => setShow6(!show6)}
              name="calendar"
              size={35}
              color="#7F7F7F"
              style={{
                top: 30,
                position: "absolute",
                right: 20,
                marginBottom: 0,
                zIndex: 1000,
              }}
            />
          </TouchableOpacity>
        </View>
        {show6 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date6}
            mode={mode6}
            is24Hour={true}
            desplay="default"
            onChange={onChangeBillBooking}
            style={{ width: 400 }}
          />
        )}
        <FormInput
          placeholder="Debit Cho"
          label="Debit Cho"
          value={bookingInfo.debit}
          onChangeText={(value) => handleOnChangeText("debit", value)}
        />
        <FormInput
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={bookingInfo.notes}
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
});

export default AddBookingLog;
