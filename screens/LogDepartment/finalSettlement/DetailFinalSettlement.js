import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import clientReport from "../../../api/clientReport";
import color from "../../../contains/color";
import { ipAddress } from "../../../contains/constant";

const DetailFinalSettlement = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.id);
  const [dataFinalSettlement, setDataFinalSettlement] = useState();

  const getAllOPSItemDetails = async () => {
    const url = `api/report-log/getById/`;
    clientReport
      .get(`${ipAddress}/${url}` + data)
      //   .then((res) => setBuyItem(res.data.report.buyReport))
      .then((res) => setDataFinalSettlement(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllOPSItemDetails();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.navigate("AdvanceLog", {
    //     item: item,
    //   });
    // }}
    >
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Tổng Tạm Ứng: </Text>
          <Text style={styles.textDisplay}>{item.totalOPS}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Tổng Tạm Chi: </Text>
          <Text style={styles.textDisplay}>{item.totalPaid}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Quyết Toán: </Text>
          <Text style={styles.textDisplay}>{item.totalSettlement}</Text>
        </View>
        {item.totalSettlement < 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate("ReceiptLog", {
                data: data,
              });
            }}
            style={{
              backgroundColor: color.primary,
              alignItems: "center",
              width: 150,
              justifyContent: "center",
              alignContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              marginBottom: 10,
              padding: 15,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 17, color: "white" }}>
              Xuất Phiếu Thu
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("PaymentLog", {
                data: data,
              });
            }}
            style={{
              backgroundColor: color.primary,
              alignItems: "center",
              width: 150,
              justifyContent: "center",
              alignContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              marginBottom: 10,
              padding: 15,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 17, color: "white" }}>
              Xuất Phiếu Chi
            </Text>
          </Pressable>
        )}
        {/* <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Hành Động: </Text>
          <Text style={styles.textDisplay}>{item.actions}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLable}>Tình trạng: </Text>
          <Text style={styles.textDisplay}>{item.status}</Text>
        </View> */}
      </View>
      <Text
        style={{
          height: 1,
          borderWidth: 2,
          borderColor: "#D8D8D8",
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
  return (
    <>
      {dataFinalSettlement?.report && (
        <View style={styles.displayData}>
          <FlatList
            style={styles.list}
            data={dataFinalSettlement.report.finalSettlement}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </>
  );
};

export default DetailFinalSettlement;

const styles = StyleSheet.create({
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
    marginBottom: 0,
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
  icon: {
    fontSize: 24,
    color: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginLeft: 10,
  },
  dropMenu: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    flex: 1,
    minWidth: 190,
    minHeight: 40,
    zIndex: 1000,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  styleSearch: {
    flex: 1,
    height: 50,
    paddingLeft: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#BFBFBF",
    borderRadius: 30,
    fontSize: 18,
  },
  detail: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#0176E4",
    borderWidth: 1,
  },
  textLable: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    paddingLeft: 35,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: color.borderColor,
    borderRadius: 30,
    fontSize: 18,
  },
  textDisplay: {
    fontSize: 19,
    lineHeight: 25,
    alignItems: "center",
    marginRight: 20,
  },
  displayData: {
    flex: 9,
    width: "100%",
    padding: 10,
  },
  list: {
    flex: 1,
    padding: 8,
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
  textDisplayCode: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 17,
    fontWeight: "500",
    color: "#0176E4",
    textDecorationLine: "underline",
  },
});
