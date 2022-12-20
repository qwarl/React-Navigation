import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormInput from "../../../../../components/FormInput";
import color from "../../../../../contains/color";
import clientReport from "../../../../../api/clientReport";
// import { ipAddress } from "../../../../../contains/constant";

const AddExchangeRate = ({ route, navigation }) => {
  const idReportLog = route.params.id;
  console.log("hihihihihihihihihihihihi", idReportLog);

  const [exchangeRate, setExchangeRate] = useState({ exchangeRate: 0 });

  console.log("exchangeRate", exchangeRate);

  const handleOnChangeText = (fieldName, value) => {
    setExchangeRate({ ...exchangeRate, [fieldName]: value });
  };

  const updateExchangeRate = async () => {
    console.log("add exchange rate to report ");

    try {
      const res = await clientReport.put(
        `/update-report-log-by-id/${idReportLog}`,
        { ...exchangeRate }
      );
      if (res.data.success) {
        Alert.alert("Thêm Thành Công");
        // navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <FormInput
        label="Loại phí"
        placeholder="Loại phí"
        onChangeText={(value) => handleOnChangeText("exchangeRate", value)}
        value={exchangeRate.exchangeRate}
      />
      <TouchableOpacity
        style={[styles.buttonUpdate]}
        onPress={() => {
          navigation.replace("AddBuyDetail", {
            data: data,
          });
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: color.primary,
            fontWeight: "bold",
          }}
        >
          Nhập giá mua
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AddExchangeRate;

const styles = StyleSheet.create({
  buttonUpdate: {
    marginTop: 20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    marginBottom: 30,
    color: color.primary,
    marginRight: 10,
  },
});
