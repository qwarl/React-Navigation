import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import color from "../../../../contains/color";
import FormInput from "../../../../components/FormInput";
import clientReport from "../../../../api/clientReport";

const AddSellDetail = ({ route, navigation }) => {
  // get id of report from ProfitReport
  // const [idReport, setIdReport] = useState(route.params.data);
  const idReportLog = route.params.data;
  console.log("idReport", idReportLog);
  const [sellItemDetails, setSellItemDetails] = useState({
    // idReportLog: route.params.data,
    typeOfFee: "",
    quantity: "",
    unitPrice: "",
    currency: "",
    exchangeRate: "",
    total: "",
    VAT: "",
    actualPayment: "",
    approximatelyToVnd: "",
    note: "",
    invoiceNumber: "",
  });
  console.log(sellItemDetails);

  // set id to idReportLog in sellItemDetails
  // setSellItemDetails(prevState =>({...prevState, idReportLog : idReport}));
  const createNewSellItem = async () => {
    console.log("create new sell item");

    try {
      const res = await clientReport.post(
        "api/report-log/add-sell-item-details/",
        { ...sellItemDetails, idReportLog: idReportLog }
      );
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        // navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOnChangeText = (fieldName, value) => {
    setSellItemDetails({ ...sellItemDetails, [fieldName]: value });
  };
  return (
    <>
      <ScrollView>
        <FormInput
          label="Loại phí"
          placeholder="Loại phí"
          onChangeText={(value) => handleOnChangeText("typeOfFee", value)}
          value={sellItemDetails.typeOfFee}
        />
        <FormInput
          label="Số lượng"
          placeholder="Số lượng"
          onChangeText={(value) => handleOnChangeText("quantity", value)}
          value={sellItemDetails.quantity}
        />
        <FormInput
          label="Đơn giá"
          placeholder="Đơn giá"
          onChangeText={(value) => handleOnChangeText("unitPrice", value)}
          value={sellItemDetails.unitPrice}
        />
        <FormInput
          label="Đồng tiền"
          placeholder="Đồng tiền"
          onChangeText={(value) => handleOnChangeText("currency", value)}
          value={sellItemDetails.currency}
        />
        <FormInput
          label="Tỉ giá"
          placeholder="Tỉ giá"
          onChangeText={(value) => handleOnChangeText("exchangeRate", value)}
          value={sellItemDetails.exchangeRate}
        />
        <FormInput
          label="Total"
          placeholder="Total"
          onChangeText={(value) => handleOnChangeText("total", value)}
          value={sellItemDetails.total}
        />
        <FormInput
          label="VAT"
          placeholder="VAT"
          onChangeText={(value) => handleOnChangeText("VAT", value)}
          value={sellItemDetails.VAT}
        />
        <FormInput
          label="Thành tiền"
          placeholder="Thành tiền"
          onChangeText={(value) => handleOnChangeText("actualPayment", value)}
          value={sellItemDetails.actualPayment}
        />
        <FormInput
          label="Total (VND)"
          placeholder="Total (VND)"
          onChangeText={(value) =>
            handleOnChangeText("approximatelyToVnd", value)
          }
          value={sellItemDetails.approximatelyToVnd}
        />
        <FormInput
          label="Số hóa đơn"
          placeholder="Số hóa đơn"
          onChangeText={(value) => handleOnChangeText("invoiceNumber", value)}
          value={sellItemDetails.invoiceNumber}
        />
        <FormInput
          label="Ghi chú"
          placeholder="Ghi chú"
          onChangeText={(value) => handleOnChangeText("note", value)}
          value={sellItemDetails.note}
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
          onPress={createNewSellItem}
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

export default AddSellDetail;

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
