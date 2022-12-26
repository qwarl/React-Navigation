import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../../contains/color";
import FormInput from "../../../../../components/FormInput";
import clientReport from "../../../../../api/clientReport";
import { Dropdown } from "react-native-element-dropdown";
import { CurrencyUnit, VAT, TypeOfFee } from "../../../../../contains/constant";

const ItemPaidOnDetailsInfo = ({ route, navigation }) => {
  // const id = route.params.data;

  const [paidOnItemDetails, setPaidOnItemDetails] = useState(route.params.data);
  const id = route.params.data._id;
  console.log("id", id);
  const handleOnChangeText = (fieldName, value) => {
    setPaidOnItemDetails({ ...paidOnItemDetails, [fieldName]: value });
  };

  // add chi hộ
  const updatePaidOnItem = async () => {
    console.log("update paid on item");

    try {
      const res = await clientReport.put(`update-paid-on-item-details/`+id, {
        ...paidOnItemDetails,
      });
      if (res.data.success) {
        Alert.alert("Cập nhật Thành Công");
        // navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("paidOnItemDetails", paidOnItemDetails);

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
            value={paidOnItemDetails.typeOfFee}
            onChange={(value) => {
              setPaidOnItemDetails({
                ...paidOnItemDetails,
                typeOfFee: value.value,
              });
            }}
          />
          <FormInput
            label="Số tiền"
            placeholder="Số tiền"
            onChangeText={(value) => handleOnChangeText("price", value)}
            value={`${paidOnItemDetails.price}`}
          />
          <FormInput
            label="Số hóa đơn"
            placeholder="Số hóa đơn"
            onChangeText={(value) => handleOnChangeText("invoiceNumber", value)}
            value={`${paidOnItemDetails.invoiceNumber}`}
          />
          <FormInput
            label="Thu"
            placeholder="Thu"
            onChangeText={(value) => handleOnChangeText("payer", value)}
            value={paidOnItemDetails.payer}
          />
          <FormInput
            label="T/T cho"
            placeholder="T/T cho"
            onChangeText={(value) => handleOnChangeText("paymentFor", value)}
            value={paidOnItemDetails.paymentFor}
          />
          <FormInput
            label="Tên người chi"
            placeholder="Tên người chi"
            onChangeText={(value) => handleOnChangeText("paidBy", value)}
            value={paidOnItemDetails.paidBy}
          />
        </View>
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
          onPress={() => {updatePaidOnItem()}}
        >
          <Text
            style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ItemPaidOnDetailsInfo;

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
