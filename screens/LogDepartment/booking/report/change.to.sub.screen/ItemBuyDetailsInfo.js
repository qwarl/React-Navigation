import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import color from "../../../../../contains/color";
import FormInput from "../../../../../components/FormInput";
import clientReport from "../../../../../api/clientReport";
import { Dropdown } from "react-native-element-dropdown";
import { CurrencyUnit, VAT } from "../../../../../contains/constant";

const ItemBuyDetailsInfo = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.data);

  console.log("id", route.params);
  return (
    <>
      {route.params.code === "PROFIT_REPORT" ? (
        <View style={styles.item}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Loại phí: </Text>
            <Text style={styles.textDisplay}>{data.typeOfFee}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Số lượng: </Text>
            <Text style={styles.textDisplay}>{data.quantity}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Đơn giá: </Text>
            <Text style={styles.textDisplay}>{data.unitPrice}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Đồng tiền: </Text>
            <Text style={styles.textDisplay}>{data.currency}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Tỉ giá: </Text>
            <Text style={styles.textDisplay}>{data.exchangeRate}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Total (VND): </Text>
            <Text style={styles.textDisplay}>
              {data.total}
              {data.totalUSD !== 0
                ? `${data.totalUSD} USD ~ ${data.changeToVND}`
                : null}
              {data.totalEUR !== 0
                ? `${data.totalEUR} EUR ~ ${data.changeToVND}`
                : null}
              {data.totalVND !== 0 ? `${data.totalVND} VND` : null}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>VAT: </Text>
            <Text style={styles.textDisplay}>{data.VAT}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Thành tiền: </Text>
            <Text style={styles.textDisplay}>
              {/* {data.actualPayment} */}
              {data.actualPaymentVND !== 0
                ? `${data.actualPaymentVND} VND`
                : ""}
              {data.actualPaymentEUR !== 0
                ? `${data.actualPaymentEUR} EUR ~ ${data.changeToVNDVAT}`
                : ""}
              {data.actualPaymentUSD !== 0
                ? `${data.actualPaymentUSD} USD ~ ${data.changeToVNDVAT}`
                : ""}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Thanh toán cho: </Text>
            <Text style={styles.textDisplay}>{data.paymentFor}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Tên người chi: </Text>
            <Text style={styles.textDisplay}>{data.paidBy}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Số hóa đơn: </Text>
            <Text style={styles.textDisplay}>{data.invoiceNumber}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLable}>Ghi chú: </Text>
            <Text style={styles.textDisplay}>{data.note}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateBuyInfo", data);
          }}
        >
          <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Loại phí: </Text>
              <Text style={styles.textDisplay}>{data.typeOfFee}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Số lượng: </Text>
              <Text style={styles.textDisplay}>{data.quantity}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Đơn giá: </Text>
              <Text style={styles.textDisplay}>{data.unitPrice}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Đồng tiền: </Text>
              <Text style={styles.textDisplay}>{data.currency}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Tỉ giá: </Text>
              <Text style={styles.textDisplay}>{data.exchangeRate}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Total (VND): </Text>
              <Text style={styles.textDisplay}>
                {data.total}
                {data.totalUSD !== 0
                  ? `${data.totalUSD} USD ~ ${data.changeToVND}`
                  : null}
                {data.totalEUR !== 0
                  ? `${data.totalEUR} EUR ~ ${data.changeToVND}`
                  : null}
                {data.totalVND !== 0 ? `${data.totalVND} VND` : null}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>VAT: </Text>
              <Text style={styles.textDisplay}>{data.VAT}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Thành tiền: </Text>
              <Text style={styles.textDisplay}>
                {/* {data.actualPayment} */}
                {data.actualPaymentVND !== 0
                  ? `${data.actualPaymentVND} VND`
                  : ""}
                {data.actualPaymentEUR !== 0
                  ? `${data.actualPaymentEUR} EUR ~ ${data.changeToVNDVAT}`
                  : ""}
                {data.actualPaymentUSD !== 0
                  ? `${data.actualPaymentUSD} USD ~ ${data.changeToVNDVAT}`
                  : ""}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Thanh toán cho: </Text>
              <Text style={styles.textDisplay}>{data.paymentFor}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Tên người chi: </Text>
              <Text style={styles.textDisplay}>{data.paidBy}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Số hóa đơn: </Text>
              <Text style={styles.textDisplay}>{data.invoiceNumber}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLable}>Ghi chú: </Text>
              <Text style={styles.textDisplay}>{data.note}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ItemBuyDetailsInfo;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 8,
  },
  displayData: {
    flex: 1,
    width: "100%",
  },
  textDisplay: {
    fontSize: 19,
    lineHeight: 25,
    alignItems: "center",
  },
  textLable: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  item: {
    marginLeft: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#0176E4",
    borderWidth: 1,
  },
});
