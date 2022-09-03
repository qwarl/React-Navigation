import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import SelectList from "react-native-dropdown-select-list";

const FormDropDownMonth = ({ label }) => {
  const [selected, setSelected] = React.useState("");
  const data = [
    { value: "Tháng 1" },
    { value: "Tháng 2" },
    { value: "Tháng 3" },
    { value: "Tháng 4" },
    { value: "Tháng 5" },
    { value: "Tháng 6" },
    { value: "Tháng 7" },
    { value: "Tháng 8" },
    { value: "Tháng 9" },
    { value: "Tháng 10" },
    { value: "Tháng 11" },
    { value: "Tháng 12" },
  ];

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 4,
        flex: 1,
        minWidth: 180,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
        {label}
      </Text>
      <SelectList setSelected={setSelected} data={data} value={setSelected} />
      <Text>{selected}</Text>
    </View>
  );
};

export default FormDropDownMonth;
