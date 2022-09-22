import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Dimensions,
    Alert,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";
import SelectList from "react-native-dropdown-select-list";
import FormInput from "../../components/FormInput";
import client from "../../api/client";
import DateTimePicker from "@react-native-community/datetimepicker";

import { isValidObjectField, updateError } from "../../utils/method";
import { Month, Continent, Type } from "../../contains/constant";
const UpdateFCL = ({ route }) => {
    const [updateData, setUpdateData] = useState(route.params.data);
    const [open, setOpen] = useState(false);


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
  
      // setShow(Platform.OS === 'ios');
      // if (mode == 'date') {
      //   const currentDate = selectedDate || new Date();
      //   setDate(currentDate);
      // }
    };
  
    const showMode = (currentMode) => {
      // if (Platform.OS === 'ios') {
      setShow(true);
      // for iOS, add a button that closes the picker
      // }
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode("date");
    };
  
    const showTimepicker = () => {
      showMode("time");
    };

    const handleOnChangeText = (value, fieldName) => {
        setUpdateData({ ...updateData, [fieldName]: value });
    };

    const isValidForm = () => {
        if (!isValidObjectField(updateData))
            return updateError("Required all fields!", setError);
        //only valid email id is allowed
        // if (!isValidEmail(email)) return updateError("Invalid email!", setError);
        // // password must have 8 or more characters
        // if (!password.trim() || password.length < 8)
        //   return updateError("Password is too short!", setError);
        return true;
    };


    const submitForm = async () => {
        if (isValidForm()) {
            try {
                const url = "/update/";
                const id = updateData._id;
                const res = await client.post(url + id, { ...updateData });
                if (res.data.success) {
                    Alert.alert("Cập Nhật Thành Công");
                }
                console.log("running");
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    // console.log("123", updateData.month);

    return (
        <View style={StyleSheet.container}>
            <ScrollView>
                <View style={styles.dropMenu}>
                    <Text style={styles.label}>Chọn Tháng</Text>
                    <SelectList
                        setSelected={(value) =>
                            setUpdateData({ ...updateData, month: value })
                        }
                        data={Month}
                        defaultOption={{ key: updateData.month, value: updateData.month }}
                    />
                </View>
                <View style={styles.dropMenu}>
                    <Text style={styles.label}>Chọn Châu</Text>
                    <SelectList
                        setSelected={(value) =>
                            setUpdateData({ ...updateData, continent: value })
                        }
                        data={Continent}
                        defaultOption={{
                            key: updateData.continent,
                            value: updateData.continent,
                        }}
                    />
                </View>
                <View style={styles.dropMenu}>
                    <Text style={styles.label}>Chọn Loại Container</Text>
                    <SelectList
                        setSelected={(value) =>
                            setUpdateData({ ...updateData, container: value })
                        }
                        data={Type}
                        defaultOption={{ key: updateData.container, value: updateData.container }}
                    />
                </View>
                <FormInput
                    placeholder="POL"
                    label="POL"
                    onChangeText={(value) => handleOnChangeText(value, "pol")}
                    value={updateData.pol}
                />
                <FormInput
                    placeholder="POD"
                    label="POD"
                    onChangeText={(value) => handleOnChangeText(value, "pod")}
                    value={updateData.pod}
                />
                <FormInput
                    label="O/F 20"
                    placeholder="O/F 20"
                    onChangeText={(value) => handleOnChangeText(value, "of20")}
                    value={updateData.of20}
                />
                <FormInput
                    label="O/F 40"
                    placeholder="O/F 40"
                    onChangeText={(value) => handleOnChangeText(value, "of40")}
                    value={updateData.of40}
                />
                <FormInput
                    label="O/F 45"
                    placeholder="O/F 45"
                    onChangeText={(value) => handleOnChangeText(value, "of45")}
                    value={updateData.of45}
                />
                <FormInput
                    placeholder="SUR 20"
                    label="SUR 20"
                    onChangeText={(value) => handleOnChangeText(value, "sur20")}
                    value={updateData.sur20}
                />
                <FormInput
                    placeholder="SUR 40"
                    label="SUR 40"
                    onChangeText={(value) => handleOnChangeText(value, "sur40")}
                    value={updateData.sur40}
                />
                <FormInput
                    placeholder="LINES"
                    label="LINES"
                    onChangeText={(value) => handleOnChangeText(value, "lines")}
                    value={updateData.lines}
                />
                <FormInput
                    placeholder="FREE TIME"
                    label="FREE TIME"
                    onChangeText={(value) => handleOnChangeText(value, "freeTime")}
                    value={updateData.freeTime}
                />
                <FormInput
                    placeholder="VALID"
                    label="VALID"
                    value={updateData.toLocaleDateString()}
                />
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                    {/* <Text>selected: {date.toLocaleDateString()}</Text> */}
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>
                <FormInput
                    placeholder="NOTES"
                    label="NOTES"
                    onChangeText={(value) => handleOnChangeText(value, "notes")}
                    value={updateData.notes}
                />
                <View
                    style={{
                        flex: 1,
                        marginVertical: 30,
                        marginHorizontal: 80,
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity style={[styles.buttonInsert]} onPress={submitForm}>
                        <Text style={{ fontSize: 18, color: "#fff" }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateFCL

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        backgroundColor: color.primary,
        borderRadius: 44,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: color.background,
        position: "absolute",
        right: 10,
        marginBottom: 30,
        marginTop: 10,
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
        height: 45,
        backgroundColor: "rgba(27,27,51,1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
})