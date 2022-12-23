import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../contains/color";
import FormInput from "../../../../components/FormInput";
import clientReport from "../../../../api/clientReport";
import { Dropdown } from "react-native-element-dropdown";
import {
  CurrencyUnit,
  VAT,
  TypeOfFee,
  COM_KH,
  ipAddress,
} from "../../../../contains/constant";

const AddBuyDetail = ({ route, navigation }) => {
  const idReportLog = route.params.data;
  console.log("idReport", idReportLog);

  const [buyItemDetails, setBuyItemDetails] = useState({
    // idReportLog: route.params.data,
    typeOfFee: "",
    quantity: 1,
    unitPrice: "",
    currency: "VND",
    COM_KH: "",
    price_COM_KH: 0,
    // total: 0, // price of item = unitPrice * quantity
    totalVND: 0, // price of item = unitPrice * quantity
    totalUSD: 0, // price of item = unitPrice * quantity
    totalEUR: 0, // price of item = unitPrice * quantity
    changeToVND: 0, //total(USD/EUR) * exchangeRate. not inclueded VAT
    changeToVNDVAT: 0, // actualPayment(USD/EUR) * exchangeRate. included VAT
    VAT: 0,
    exchangeRate: 0,
    actualPaymentVND: 0, // total after VAT = total * ( 1 + VAT )
    actualPaymentUSD: 0, // total after VAT
    actualPaymentEUR: 0, // total after VAT
    // approximatelyToVnd: 0, // if currency !== VND, show 0. else appreoximatelyToVnd == actualPaymentVND
    note: "",
    invoiceNumber: "",
    paymentFor: "",
    paidBy: "",
  });
  console.log(buyItemDetails);

  // quy doi ra tien viet tong tien truoc thue
  useEffect(() => {
    // change total of item from usd to vnd do not inclueded VAT
    if (buyItemDetails.currency !== "VND" && buyItemDetails.totalUSD !== 0) {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVND: buyItemDetails.totalUSD * buyItemDetails.exchangeRate,
      }));
    }

    // change total of item from eur to vnd do not inclueded VAT
    else if (
      buyItemDetails.currency !== "VND" &&
      buyItemDetails.totalEUR !== 0
    ) {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVND: buyItemDetails.totalEUR * buyItemDetails.exchangeRate,
      }));
    } else if (buyItemDetails.currency === "VND") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVND: 0,
      }));
    }
  }, [
    buyItemDetails.currency,
    buyItemDetails.totalUSD,
    buyItemDetails.totalEUR,
    buyItemDetails.exchangeRate,
  ]);

  // quy doi ra tien viet tong tien sau thue
  useEffect(() => {
    // change usd to vnd inclueded VAT
    if (
      buyItemDetails.currency !== "VND" &&
      buyItemDetails.actualPaymentUSD !== 0
    ) {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVNDVAT:
          buyItemDetails.actualPaymentUSD * buyItemDetails.exchangeRate,
      }));
    }

    // change usd to vnd do not inclueded VAT
    else if (
      buyItemDetails.currency !== "VND" &&
      buyItemDetails.actualPaymentEUR !== 0
    ) {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVNDVAT:
          buyItemDetails.actualPaymentEUR * buyItemDetails.exchangeRate,
      }));
    } else if (buyItemDetails.currency === "VND") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        changeToVNDVAT: 0,
      }));
    }
  }, [
    buyItemDetails.currency,
    buyItemDetails.actualPaymentUSD,
    buyItemDetails.actualPaymentEUR,
    buyItemDetails.exchangeRate,
  ]);

  // tinh tong tien chua tinh VAT, gan vao tongr tien tuong ung trong usestate
  useEffect(() => {
    if (buyItemDetails.currency === "USD") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        totalUSD: buyItemDetails.unitPrice * buyItemDetails.quantity,
        totalEUR: 0,
        totalVND: 0,
      }));
    } else if (buyItemDetails.currency === "EUR") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        totalEUR: buyItemDetails.unitPrice * buyItemDetails.quantity,
        totalUSD: 0,
        totalVND: 0,
      }));
    } else {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        totalVND: buyItemDetails.unitPrice * buyItemDetails.quantity,
        totalEUR: 0,
        totalUSD: 0,
      }));
    }
  }, [
    buyItemDetails.quantity,
    buyItemDetails.unitPrice,
    buyItemDetails.currency,
  ]);

  // tinh tong tien sau VAT (chua quy doi ra tien viet)

  useEffect(() => {
    if (buyItemDetails.currency === "EUR") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        actualPaymentEUR:
          buyItemDetails.totalEUR +
          buyItemDetails.totalEUR * buyItemDetails.VAT,
        actualPaymentVND: 0,
        actualPaymentUSD: 0,
      }));
    } else if (buyItemDetails.currency === "USD") {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        actualPaymentUSD:
          buyItemDetails.totalUSD +
          buyItemDetails.totalUSD * buyItemDetails.VAT,
        actualPaymentEUR: 0,
        actualPaymentVND: 0,
      }));
    } else {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        actualPaymentVND:
          buyItemDetails.totalVND +
          buyItemDetails.totalVND * buyItemDetails.VAT,
        actualPaymentEUR: 0,
        actualPaymentUSD: 0,
      }));
    }
  }, [
    buyItemDetails.VAT,
    buyItemDetails.totalEUR,
    buyItemDetails.totalUSD,
    buyItemDetails.totalVND,
    buyItemDetails.currency,
  ]);

  const handleOnChangeText = (fieldName, value) => {
    setBuyItemDetails({ ...buyItemDetails, [fieldName]: value });
  };

  // add buy item
  const createNewBuyItem = async () => {
    console.log("create new buy item");

    try {
      const res = await clientReport.post("add-buy-item-details", {
        buyItemDetails: buyItemDetails,
        idReportLog: idReportLog,
      });
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        // navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // cal COM KH
  useEffect(()=>{
    if (buyItemDetails.currency === "VND" && buyItemDetails.COM_KH === "CHUẨN") {
      if (buyItemDetails.actualPaymentVND / 23000 >= 200) {
        setBuyItemDetails((prevState) => ({
          ...prevState,
          price_COM_KH: buyItemDetails.actualPaymentVND * 0.85,
        }));
      } else {
        setBuyItemDetails((prevState) => ({
          ...prevState,
          price_COM_KH: buyItemDetails.actualPaymentVND * 0.9,
        }));
      }
    } else if (
      buyItemDetails.currency === "VND" &&
      buyItemDetails.COM_KH === "KHÁC"
    ) {
      setBuyItemDetails((prevState) => ({
        ...prevState,
        price_COM_KH: buyItemDetails.actualPaymentVND * 0.8,
      }));
    }else{
      setBuyItemDetails((prevState) => ({
        ...prevState,
        price_COM_KH: 0,
        COM_KH:'',
      }))
    }
  },[buyItemDetails.actualPaymentVND,buyItemDetails.COM_KH,buyItemDetails.currency])

  return (
    <>
      <ScrollView>
        <Text style={styles.input}>Loại phí</Text>

        <View style={styles.containerDropDown}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={TypeOfFee}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={buyItemDetails.typeOfFee}
            onChange={(value) => {
              setBuyItemDetails({
                ...buyItemDetails,
                typeOfFee: value.value,
              });
            }}
          />
        </View>

        <FormInput
          label="Số lượng"
          placeholder="Số lượng"
          onChangeText={(value) => handleOnChangeText("quantity", value)}
          value={`${buyItemDetails.quantity}`}
        />
        <FormInput
          label="Đơn giá"
          placeholder="Đơn giá"
          onChangeText={(value) => handleOnChangeText("unitPrice", value)}
          value={buyItemDetails.unitPrice}
        />

        {/* dropdown pick currency */}
        <Text style={styles.input}>Đồng tiền</Text>
        <View style={styles.containerDropDown}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={CurrencyUnit}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={buyItemDetails.currency}
            onChange={(value) => {
              setBuyItemDetails({ ...buyItemDetails, currency: value.value });
            }}
          />
        </View>

        {/* <FormInput
          label="Đồng tiền"
          placeholder="Đồng tiền"
          onChangeText={(value) => handleOnChangeText("currency", value)}
          value={buyItemDetails.currency}
        /> */}
        <FormInput
          label="Tỉ giá"
          placeholder="Tỉ giá"
          onChangeText={(value) => handleOnChangeText("exchangeRate", value)}
          value={buyItemDetails.exchangeRate}
        />
        <Text style={styles.input}>Total (VND)</Text>
        <Text style={{ marginLeft: 20, paddingBottom: 10 }}>
          {buyItemDetails.totalUSD !== 0
            ? `${buyItemDetails.totalUSD} USD`
            : ""}
          {buyItemDetails.totalVND !== 0
            ? `${buyItemDetails.totalVND} VND`
            : ""}
          {buyItemDetails.totalEUR !== 0
            ? `${buyItemDetails.totalEUR} EUR`
            : ""}
        </Text>
        {/* doi ra tien vnd neu currency !==vnd */}
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {buyItemDetails.changeToVND !== 0
            ? `~ ${buyItemDetails.changeToVND} VND`
            : null}
        </Text>
        <Text style={styles.input}>VAT</Text>
        <View style={styles.containerDropDown}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={VAT}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={buyItemDetails.currency}
            onChange={(value) => {
              setBuyItemDetails({ ...buyItemDetails, VAT: value.value });
            }}
          />
        </View>
        <Text style={styles.input}>Thành tiền (VND)</Text>
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {/* {buyItemDetails.currency == "VND"
            ? buyItemDetails.actualPaymentVND
            : 0}
          {buyItemDetails.currency == "VND"
            ? buyItemDetails.actualPaymentVND
            : 0} */}
          {buyItemDetails.actualPaymentVND !== 0
            ? `${buyItemDetails.actualPaymentVND} VND`
            : ""}
          {buyItemDetails.actualPaymentEUR !== 0
            ? `${buyItemDetails.actualPaymentEUR} EUR`
            : ""}
          {buyItemDetails.actualPaymentUSD !== 0
            ? `${buyItemDetails.actualPaymentUSD} USD`
            : ""}
          {/* {buyItemDetails.approximatelyToVnd} VND */}
        </Text>
        {/* doi ra tien vnd neu currency !==vnd */}
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {buyItemDetails.changeToVNDVAT !== 0
            ? `~ ${buyItemDetails.changeToVNDVAT} VND`
            : null}
        </Text>

        {buyItemDetails.typeOfFee === "Com Khách" ? (
          <View>
            <View style={styles.containerDropDown}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={COM_KH}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={buyItemDetails.COM_KH}
                onChange={(value) => {
                  setBuyItemDetails({
                    ...buyItemDetails,
                    COM_KH: value.value,
                  });
                }}
              />
            </View>
        <Text style={styles.input}>COM KHÁCH HÀNG SAU CHARGE</Text>
        <Text style={{ marginLeft: 20, paddingBottom: 10 }}>{buyItemDetails.price_COM_KH}</Text>

          </View>
        ) : null}

        <FormInput
          label="T/T cho"
          placeholder="T/T cho"
          onChangeText={(value) => handleOnChangeText("paymentFor", value)}
          value={buyItemDetails.paymentFor}
        />
        <FormInput
          label="Tên người chi"
          placeholder="Tên người chi"
          onChangeText={(value) => handleOnChangeText("paidBy", value)}
          value={buyItemDetails.paidBy}
        />
        <FormInput
          label="Số hóa đơn"
          placeholder="Số hóa đơn"
          onChangeText={(value) => handleOnChangeText("invoiceNumber", value)}
          value={buyItemDetails.invoiceNumber}
        />
        <FormInput
          label="Ghi chú"
          placeholder="Ghi chú"
          onChangeText={(value) => handleOnChangeText("note", value)}
          value={buyItemDetails.note}
        />
      </ScrollView>
      <View
        style={{
          flex: 1,
          marginVertical: 30,
          marginHorizontal: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[styles.buttonInsert]}
          onPress={() => createNewBuyItem()}
        >
          <Text
            style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
          >
            Thêm
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddBuyDetail;

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
    marginBottom: 10,
    width: "90%",
    marginLeft: 20,
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
  input: {
    // height: 20,
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    // height: 50,
    marginLeft: 17,
    marginRight: 17,
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
});
