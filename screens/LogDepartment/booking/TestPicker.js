import React, { useState } from "react";
import { Button, Platform, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TestPicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [text, setText] = useState("Empty");

  const [date1, setDate1] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [mode1, setMode1] = useState("date");
  const [text1, setText1] = useState("Empty");

  const onChange = (event, selectedDate) => {
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
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText(fDate + "\n" + fTime);
  };
  const onChange1 = (event, selectedDate) => {
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
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText1(fDate + "\n" + fTime);
  };
  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{text}</Text>
      <View style={{ margin: 20 }}>
        <Button title="DatePicker" onPress={() => showMode("date")} />
      </View>
      <View style={{ margin: 20 }}>
        <Button title="TimePicker" onPress={() => showMode("time")} />
      </View>
      {show1 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date1}
          mode={mode1}
          is24Hour={true}
          display="default"
          onChange={onChange1}
          style={{ width: 200, alignItems: "left", }}
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{text1}</Text>
      <View style={{ margin: 20 }}>
        <Button title="DatePicker" onPress={() => showMode1("date")} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{ width: 200 }}
        />
      )}
    </View>
  );
};

export default TestPicker;
