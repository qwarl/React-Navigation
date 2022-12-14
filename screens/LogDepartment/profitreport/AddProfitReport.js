import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  Image,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../../contains/color";

const AddProfitReport = () => {
  return (
    <View style={StyleSheet.container}>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ScrollView>
        <FormInput
          label="Số Báo Giá"
          placeholder="Số Báo Giá"
          onChangeText={(value) => handleOnChangeText("code", value)}
          value={bookingInfo.code}
        />
        <FormInput
          label="Số File"
          placeholder="Số File"
          onChangeText={(value) => handleOnChangeText("idfile", value)}
          value={bookingInfo.idfile}
        />
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Sales</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={NameSales}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.sales}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, sales: value.value });
            }}
          />
        </View>
        <FormInput
          placeholder="Docs"
          label="Docs"
          value={bookingInfo.docs}
          onChangeText={(value) => handleOnChangeText("docs", value)}
        />
        <FormInput
          placeholder="OPS"
          label="OPS"
          value={bookingInfo.ops}
          onChangeText={(value) => handleOnChangeText("ops", value)}
        />
        <FormInput
          placeholder="Khách Hàng"
          label="Khách Hàng"
          onChangeText={(value) => handleOnChangeText("customer", value)}
          value={bookingInfo.customer}
        />
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Hình</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Type}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.type}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, type: value.value });
            }}
          />
        </View>
        <FormInput
          label="Số Tờ Khai"
          placeholder="Số Tờ Khai"
          onChangeText={(value) =>
            handleOnChangeText("numberdeclaration", value)
          }
          value={bookingInfo.numberdeclaration}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.textValid}>Ngày Tờ Khai</Text>
            <TextInput
              style={styles.validStyle}
              placeholder="Chọn Ngày"
              label="Chọn Ngày"
              value={bookingInfo.daydeclaration}
              onChangeText={(value) =>
                handleOnChangeText("daydeclaration", value)
              }
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
            onChange={onChangeDeclaration}
            style={{ width: 400 }}
          />
        )}
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Phân Luồng</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Stream}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.stream}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, stream: value.value });
            }}
          />
        </View>
        <FormInput
          placeholder="Loại Hàng"
          label="Loại Hàng"
          onChangeText={(value) => handleOnChangeText("typeProduct", value)}
          value={bookingInfo.typeProduct}
        />
        <FormInput
          placeholder="Số Lượng"
          label="Số Lượng"
          onChangeText={(value) => handleOnChangeText("quantity", value)}
          value={bookingInfo.quantity}
        />
        <View style={styles.dropMenu}>
          <Text style={styles.label}>Loại Container</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Container}
            search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={bookingInfo.container}
            onChange={(value) => {
              setBookingInfo({ ...bookingInfo, container: value.value });
            }}
          />
        </View>
        <FormInput
          placeholder="Số Kiện"
          label="Số Kiện"
          value={bookingInfo.numberbale}
          onChangeText={(value) => handleOnChangeText("numberbale", value)}
        />
        <FormInput
          placeholder="Loại Kiện"
          label="Loại Kiện"
          value={bookingInfo.baletype}
          onChangeText={(value) => handleOnChangeText("baletype", value)}
        />
        <FormInput
          placeholder="Trọng Lượng"
          label="Trọng Lượng"
          value={bookingInfo.weight}
          onChangeText={(value) => handleOnChangeText("weight", value)}
        />
        <FormInput
          placeholder="Số Container"
          label="Số Container"
          value={bookingInfo.numbercotainer}
          onChangeText={(value) => handleOnChangeText("numbercotainer", value)}
        />
        <FormInput
          placeholder="Tên Hàng"
          label="Tên Hàng"
          value={bookingInfo.name}
          onChangeText={(value) => handleOnChangeText("name", value)}
        />
        <FormInput
          placeholder="Ghi Chú"
          label="Ghi Chú"
          value={bookingInfo.note}
          onChangeText={(value) => handleOnChangeText("note", value)}
        />
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
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
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

export default AddProfitReport;
