import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import FormInput from "../../../components/FormInput";

const AddReceiptLog = () => {
  const handleOnChangeText = (value, fieldName) => {
    setReceiptInfo({ ...receiptInfo, [fieldName]: value });
  };
  const [receiptInfo, setReceiptInfo] = useState({
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
        THÊM PHIẾU THU
      </Text>
      <FormInput
        label="Số"
        placeholder="Nhập Số...."
        onChangeText={(value) => handleOnChangeText(value, "number")}
        value={receiptInfo.number}
      />
      <FormInput
        label="Nợ"
        placeholder="Nhập Số Nợ...."
        onChangeText={(value) => handleOnChangeText(value, "indebt")}
        value={receiptInfo.indebt}
      />
      <FormInput
        label="Có"
        placeholder="Nhập...."
        onChangeText={(value) => handleOnChangeText(value, "has")}
        value={receiptInfo.has}
      />
      <FormInput
        label="Họ tên người nộp tiền"
        placeholder="Nhập họ tên...."
        onChangeText={(value) => handleOnChangeText(value, "name")}
        value={receiptInfo.name}
      />
      <FormInput
        label="Địa chỉ"
        placeholder="Nhập địa chỉ...."
        onChangeText={(value) => handleOnChangeText(value, "address")}
        value={receiptInfo.address}
      />
      <FormInput
        label="Lý do nộp"
        placeholder="Nhập lý do...."
        onChangeText={(value) => handleOnChangeText(value, "reason")}
        value={receiptInfo.reason}
      />
      <FormInput
        label="Số tiền"
        placeholder="Nhập Số tiền...."
        onChangeText={(value) => handleOnChangeText(value, "money")}
        value={receiptInfo.money}
      />
      <FormInput
        label="Viết bằng chữ"
        placeholder="Viết số tiền bằng chữ...."
        onChangeText={(value) => handleOnChangeText(value, "writteninletters")}
        value={receiptInfo.writteninletters}
      />
      <FormInput
        label="Kèm theo"
        placeholder="Nhập liệu...."
        onChangeText={(value) => handleOnChangeText(value, "attach")}
        value={receiptInfo.attach}
      />
    </ScrollView>
  );
};

export default AddReceiptLog;
