import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FormInput from "../../../components/FormInput";

const AddPaymentLog = () => {
  const handleOnChangeText = (value, fieldName) => {
    setPaymentInfo({ ...paymentInfo, [fieldName]: value });
  };
  const [paymentInfo, setPaymentInfo] = useState({
    number: "",
    indebt: "",
    has: "",
    name: "",
    address: "",
    reason: "",
    money: "",
    writteninletters: "",
    attach: "",
    currentday: "",
    signday: "",
  });
  return (
    <ScrollView style={{ marginTop: 30 }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        THÊM PHIẾU CHI
      </Text>
      <FormInput
        label="Số"
        placeholder="Nhập Số...."
        onChangeText={(value) => handleOnChangeText(value, "number")}
        value={paymentInfo.number}
      />
      <FormInput
        label="Nợ"
        placeholder="Nhập Số Nợ...."
        onChangeText={(value) => handleOnChangeText(value, "indebt")}
        value={paymentInfo.indebt}
      />
      <FormInput
        label="Có"
        placeholder="Nhập...."
        onChangeText={(value) => handleOnChangeText(value, "has")}
        value={paymentInfo.has}
      />
      <FormInput
        label="Họ tên người nộp tiền"
        placeholder="Nhập họ tên...."
        onChangeText={(value) => handleOnChangeText(value, "name")}
        value={paymentInfo.name}
      />
      <FormInput
        label="Địa chỉ"
        placeholder="Nhập địa chỉ...."
        onChangeText={(value) => handleOnChangeText(value, "address")}
        value={paymentInfo.address}
      />
      <FormInput
        label="Lý do nộp"
        placeholder="Nhập lý do...."
        onChangeText={(value) => handleOnChangeText(value, "reason")}
        value={paymentInfo.reason}
      />
      <FormInput
        label="Số tiền"
        placeholder="Nhập Số tiền...."
        onChangeText={(value) => handleOnChangeText(value, "money")}
        value={paymentInfo.money}
      />
      <FormInput
        label="Viết bằng chữ"
        placeholder="Viết số tiền bằng chữ...."
        onChangeText={(value) => handleOnChangeText(value, "writteninletters")}
        value={paymentInfo.writteninletters}
      />
      <FormInput
        label="Kèm theo"
        placeholder="Nhập liệu...."
        onChangeText={(value) => handleOnChangeText(value, "attach")}
        value={paymentInfo.attach}
      />
    </ScrollView>
  );
};

export default AddPaymentLog;

const styles = StyleSheet.create({});
