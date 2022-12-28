import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import FormInput from "../../../components/FormInput";
import color from "../../../contains/color";
import clientReport from "../../../api/clientReport";

const AddFinalSettlement = ({ route }) => {
  const idReportLog = route.params.data;
  const totalOps = route.params.ops;
  const totalPaidOn = route.params.paid;
  const totalBuy = route.params.buy;
  const totalFinalPaid = totalPaidOn + totalBuy;
  const totalFinalSettlement = totalOps - totalFinalPaid;
  console.log(totalOps);
  console.log(totalPaidOn);
  console.log(totalBuy);
  console.log(totalFinalSettlement);
  const [finalSettlement, setFinalSettlement] = useState({
    totalOPS: 0,
    totalPaid: 0,
    settlement: 0,
    actions: "",
    status: "",
  });

  useEffect(() => {
    setFinalSettlement({
      totalOPS: totalOps,
      totalPaid: totalFinalPaid,
      settlement: totalFinalSettlement,
    });
  }, []);

  console.log(finalSettlement);

  const handleOnChangeText = (fieldName, value) => {
    setFinalSettlement({ ...finalSettlement, [fieldName]: value });
  };

  const submitForm = async () => {
    try {
      const res = await clientReport.post("add-final-settlement-item-details", {
        finalSettlementItemDetail: finalSettlement,
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
  return (
    <View>
      <ScrollView>
        <FormInput
          label="Tổng Tạm Ứng"
          placeholder="Tổng Tạm Ứng"
          value={`${totalOps}`}
        />
        <FormInput
          placeholder="Tổng Chi"
          label="Tổng Chi"
          value={`${totalFinalPaid}`}
        />
        <FormInput
          label="Quyết Toán"
          placeholder="Quyết Toán"
          onChangeText={(value) => handleOnChangeText(value, "reason")}
          value={`${totalFinalSettlement}`}
        />
        <FormInput
          label="Hành Động"
          placeholder="Hành Động"
          onChangeText={(value) => handleOnChangeText(value, "actions")}
          value={finalSettlement.actions}
        />
        <FormInput
          label="Tình Trạng"
          placeholder="Tình Trạng"
          onChangeText={(value) => handleOnChangeText(value, "status")}
          value={finalSettlement.status}
        />
        {/* <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Ứng</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Ngày Ứng"
              value={finalSettlement.date}
              onChangeText={(value) => handleOnChangeText(value, "date")}
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
            onChange={onChange}
            style={{ width: 400 }}
          />
        )} */}
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
              style={{
                fontSize: 18,
                color: color.primary,
                fontWeight: "bold",
              }}
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  detail: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.primary,
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 2,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  label: {
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

export default AddFinalSettlement;
