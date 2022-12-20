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
import { CurrencyUnit, VAT, TypeOfFee } from "../../../../contains/constant";

const AddBuyDetail = ({ route, navigation }) => {
  const idReportLog = route.params.data;
  console.log("idReport", idReportLog);

  const [buyItemDetails, setBuyItemDetails] = useState({
    // idReportLog: route.params.data,
    typeOfFee: "",
    quantity: "",
    unitPrice: "",
    currency: "VND",
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
  });
  console.log(buyItemDetails);

  const handleOnChangeText = (fieldName, value) => {
    setBuyItemDetails({ ...buyItemDetails, [fieldName]: value });
  };

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
          value={buyItemDetails.quantity}
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
      </ScrollView>
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
