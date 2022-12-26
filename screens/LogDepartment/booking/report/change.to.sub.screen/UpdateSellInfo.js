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

const UpdateSellInfo = ({route,navigation}) => {
    const [sellItemDetails, setSellItemDetails] = useState(route.params)
    console.log('hihihi',sellItemDetails);

    useEffect(() => {
        if (sellItemDetails.currency === "VND") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            approximatelyToVnd: sellItemDetails.actualPaymentVND,
          }));
        } else if (sellItemDetails.currency==='USD'){
          setSellItemDetails((prevState) => ({
            ...prevState,
            approximatelyToVnd: sellItemDetails.changeToVNDVAT,
          }));
        }else{
          setSellItemDetails((prevState)=>({
            ...prevState,
            approximatelyToVnd:0
          }))
        }
      }, [sellItemDetails.actualPaymentVND, sellItemDetails.currency,sellItemDetails.changeToVNDVAT]);
    
      // quy doi ra tien viet tong tien truoc thue
      useEffect(() => {
        // change total of item from usd to vnd do not inclueded VAT
        if (sellItemDetails.currency !== "VND" && sellItemDetails.totalUSD !== 0) {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVND: sellItemDetails.totalUSD * sellItemDetails.exchangeRate,
          }));
        }
    
        // change total of item from eur to vnd do not inclueded VAT
        else if (
          sellItemDetails.currency !== "VND" &&
          sellItemDetails.totalEUR !== 0
        ) {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVND: sellItemDetails.totalEUR * sellItemDetails.exchangeRate,
          }));
        } else if (sellItemDetails.currency === "VND") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVND: 0,
          }));
        }
      }, [
        sellItemDetails.currency,
        sellItemDetails.totalUSD,
        sellItemDetails.totalEUR,
        sellItemDetails.exchangeRate,
      ]);
    
      // quy doi ra tien viet tong tien sau thue
      useEffect(() => {
        // change usd to vnd inclueded VAT
        if (
          sellItemDetails.currency !== "VND" &&
          sellItemDetails.actualPaymentUSD !== 0
        ) {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVNDVAT:
              sellItemDetails.actualPaymentUSD * sellItemDetails.exchangeRate,
          }));
        }
    
        // change usd to vnd do not inclueded VAT
        else if (
          sellItemDetails.currency !== "VND" &&
          sellItemDetails.actualPaymentEUR !== 0
        ) {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVNDVAT:
              sellItemDetails.actualPaymentEUR * sellItemDetails.exchangeRate,
          }));
        } else if (sellItemDetails.currency === "VND") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            changeToVNDVAT: 0,
          }));
        }
      }, [
        sellItemDetails.currency,
        sellItemDetails.actualPaymentUSD,
        sellItemDetails.actualPaymentEUR,
        sellItemDetails.exchangeRate,
      ]);
    
      // tinh tong tien chua tinh VAT, gan vao tongr tien tuong ung trong usestate
      useEffect(() => {
        if (sellItemDetails.currency === "USD") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            totalUSD: sellItemDetails.unitPrice * sellItemDetails.quantity,
            totalEUR: 0,
            totalVND: 0,
          }));
        } else if (sellItemDetails.currency === "EUR") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            totalEUR: sellItemDetails.unitPrice * sellItemDetails.quantity,
            totalUSD: 0,
            totalVND: 0,
          }));
        } else {
          setSellItemDetails((prevState) => ({
            ...prevState,
            totalVND: sellItemDetails.unitPrice * sellItemDetails.quantity,
            totalEUR: 0,
            totalUSD: 0,
          }));
        }
      }, [
        sellItemDetails.quantity,
        sellItemDetails.unitPrice,
        sellItemDetails.currency,
      ]);
    
      // tinh tong tien sau VAT (chua quy doi ra tien viet)
    
      useEffect(() => {
        if (sellItemDetails.currency === "EUR") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            actualPaymentEUR:
              sellItemDetails.totalEUR +
              sellItemDetails.totalEUR * sellItemDetails.VAT,
            actualPaymentVND: 0,
            actualPaymentUSD: 0,
          }));
        } else if (sellItemDetails.currency === "USD") {
          setSellItemDetails((prevState) => ({
            ...prevState,
            actualPaymentUSD:
              sellItemDetails.totalUSD +
              sellItemDetails.totalUSD * sellItemDetails.VAT,
            actualPaymentEUR: 0,
            actualPaymentVND: 0,
          }));
        } else {
          setSellItemDetails((prevState) => ({
            ...prevState,
            actualPaymentVND:
              sellItemDetails.totalVND +
              sellItemDetails.totalVND * sellItemDetails.VAT,
            actualPaymentEUR: 0,
            actualPaymentUSD: 0,
          }));
        }
      }, [
        sellItemDetails.VAT,
        sellItemDetails.totalEUR,
        sellItemDetails.totalUSD,
        sellItemDetails.totalVND,
        sellItemDetails.currency,
      ]);
      // set id to idReportLog in sellItemDetails
      // setSellItemDetails(prevState =>({...prevState, idReportLog : idReport}));
      const updateSellItem = async () => {
        console.log("create new sell item", );
    
        try {
          const res = await clientReport.put(`/update-sell-item-details/${sellItemDetails._id}`, {
            ...sellItemDetails
            
          });
          if (res.data.success) {
            Alert.alert("Cập nhật Thành Công");
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
        {/* <FormInput
          label="Loại phí"
          placeholder="Loại phí"
          onChangeText={(value) => handleOnChangeText("typeOfFee", value)}
          value={sellItemDetails.typeOfFee}
        /> */}
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
            value={sellItemDetails.typeOfFee}
            onChange={(value) => {
              setSellItemDetails({ ...sellItemDetails, typeOfFee: value.value });
            }}
          />
        </View>
        <FormInput
          label="Số lượng"
          placeholder="Số lượng"
          onChangeText={(value) => handleOnChangeText("quantity", value)}
          value={`${sellItemDetails.quantity}`}
        />
        <FormInput
          label="Đơn giá"
          placeholder="Đơn giá"
          onChangeText={(value) => handleOnChangeText("unitPrice", value)}
          value={sellItemDetails.unitPrice}
        />
        {/* dropdown pick currency */}
        <Text style={styles.input}>Đồng tiền</Text>
        <View style={styles.containerDropDown}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={CurrencyUnit}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={sellItemDetails.currency}
            onChange={(value) => {
              setSellItemDetails({ ...sellItemDetails, currency: value.value });
            }}
          />
        </View>

        {/* <FormInput
          label="Đồng tiền"
          placeholder="Đồng tiền"
          onChangeText={(value) => handleOnChangeText("currency", value)}
          value={sellItemDetails.currency}
        /> */}
        <FormInput
          label="Tỉ giá"
          placeholder="Tỉ giá"
          inputType='number-pad'
          onChangeText={(value) => handleOnChangeText("exchangeRate", value)}
          value={sellItemDetails.exchangeRate}
        />
        {/* <FormInput
          label="Total"
          placeholder="Total"
          onChangeText={(value) => handleOnChangeText("total", value)}
          value={sellItemDetails.total} */}
        {/* /> */}
        <Text style={styles.input}>Total</Text>
        <Text style={{ marginLeft: 20, paddingBottom: 10 }}>
          {sellItemDetails.totalUSD !== 0
            ? `${sellItemDetails.totalUSD} USD`
            : ""}
          {sellItemDetails.totalVND !== 0
            ? `${sellItemDetails.totalVND} VND`
            : ""}
          {sellItemDetails.totalEUR !== 0
            ? `${sellItemDetails.totalEUR} EUR`
            : ""}
          {/* {sellItemDetails.currency === "USD"
            ? `${sellItemDetails.totalUSD} USD`
            : ""}
          {sellItemDetails.currency === "VND"
            ? `${sellItemDetails.totalVND} VND`
            : ""}
          {sellItemDetails.currency === "EUR"
            ? `${sellItemDetails.totalEUR} EUR`
            : ""} */}
        </Text>
        {/* doi ra tien vnd neu currency !==vnd */}
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {sellItemDetails.changeToVND !== 0
            ? `~ ${sellItemDetails.changeToVND} VND`
            : null}
        </Text>
        <Text style={styles.input}>VAT</Text>
        <View style={styles.containerDropDown}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={VAT}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={`${sellItemDetails.VAT}`}
            onChange={(value) => {
              setSellItemDetails({ ...sellItemDetails, VAT: value.value });
            }}
          />
        </View>
        
        <Text style={styles.input}>Thành tiền</Text>

        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {/* {sellItemDetails.actualPayment} */}
          {sellItemDetails.actualPaymentVND !== 0
            ? `${sellItemDetails.actualPaymentVND} VND`
            : ""}
          {sellItemDetails.actualPaymentEUR !== 0
            ? `${sellItemDetails.actualPaymentEUR} EUR`
            : ""}
          {sellItemDetails.actualPaymentUSD !== 0
            ? `${sellItemDetails.actualPaymentUSD} USD`
            : ""}
        </Text>

        {/* doi ra tien vnd neu currency !==vnd */}
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {sellItemDetails.changeToVNDVAT !== 0
            ? `~ ${sellItemDetails.changeToVNDVAT} VND`
            : null}
        </Text>
        <Text style={styles.input}>Total (VND)</Text>
        <Text style={{ marginLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
          {/* {sellItemDetails.currency == "VND"
            ? sellItemDetails.actualPaymentVND
            : 0} */}
          {sellItemDetails.approximatelyToVnd} VND
        </Text>
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
          onPress={() => updateSellItem()}
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

export default UpdateSellInfo;

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
