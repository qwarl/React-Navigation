import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../../contains/color";
import clientReport from "../../../../api/clientReport";
import { ipAddress } from "../../../../contains/constant";
import { useIsFocused } from "@react-navigation/native";

const ProfitReport = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.data1);
  const code = route.params.code;
  console.log("code", code);
  // console.log('code',route.params);
  const [dataGetById, setDataGetById] = useState();
  // console.log("data hahaha", data);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getDataById();
  }, [isFocused]);
  // useEffect(() => {
  //   if (dataGetById) {
  //     console.log("sss", dataGetById);
  //   }
  // });

  const url = `api/report-log/getById/`;
  const getDataById = () => {
    try {
      // const response = await clientReport.get("/getById/" + data.id);
      clientReport
        .get(`${ipAddress}/${url}` + data)
        .then((data) => setDataGetById(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  // if (code === "PROFIT_REPORT") {
  const changeToExchangeRateScreen = () => {
    navigation.navigate("AddExchangeRate", { id: data });
    console.log("changeToExchangeRateScreen");
  };
  const changeToSellDetailsScreen = () => {
    navigation.navigate("ItemSellDetails", { id: data, code: code });
  };
  const changeToBuyDetailsScreen = () => {
    navigation.navigate("ItemBuyDetails", { id: data, code: code });
  };
  const changeToPaidOnDetailsScreen = () => {
    navigation.navigate("PaidOn", { id: data, code: code });
  };
  const changeToAdvanceOnDetailsScreen = () => {
    navigation.navigate("DetailAdvance", { id: data, code: code });
  };
  const changeToFinalSettlementOnDetailsScreen = () => {
    navigation.navigate("DetailFinalSettlement", { id: data, code: code });
  };
  // }else if(code === "WATCH_AND_UPDATE"){
  //   const changeToExchangeRateScreen = () => {
  //     navigation.navigate("AddExchangeRate", { id: data });
  //     console.log("changeToExchangeRateScreen");
  //   };
  //   const changeToSellDetailsScreen = () => {
  //     navigation.navigate("ItemSellDetails", { id: data,code:code });
  //   };
  //   const changeToBuyDetailsScreen = () => {
  //     navigation.navigate("ItemBuyDetails", { id: data,code:code });
  //   };
  //   const changeToPaidOnDetailsScreen = () => {
  //     navigation.navigate("PaidOn", { id: data,code:code });
  //   };
  // }

  // const profitUSD = dataGetById.profit / dataGetById.report.exchangeRate;

  // const usd = profitUSD.toFixed();

  // console.log(dataGetById.profit);

  return (
    <>
      {dataGetById?.report && (
        <ScrollView>
          <View style={styles.detail}>
            <Text style={styles.textDisplayCode}>
              {dataGetById.report.info.idfile}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Mã Báo Giá:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.code}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Sales:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.sales}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Khách Hàng:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.customer}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Docs:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.docs}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>OPS:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.ops}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Loại Hình:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.type}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Số Tờ Khai:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.numberdeclaration}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Ngày Tờ Khai:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.daydeclaration}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Phân Luồng:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.stream}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Loại hàng:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.typeProduct}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Số kiện:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.numberbale}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Loại kiện:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.baletype}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Số container:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.numbercotainer}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Tên hàng:</Text>
              <Text style={styles.textContent}>
                {dataGetById.report.info.name}
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={changeToSellDetailsScreen}
            >
              <Text style={styles.textDisplay}>Total Sell:</Text>
              <Text style={styles.textContent}>{dataGetById.totalSell}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={changeToBuyDetailsScreen}
            >
              <Text style={styles.textDisplay}>Total Buy:</Text>
              <Text style={styles.textContent}>{dataGetById.totalBuy}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={changeToPaidOnDetailsScreen}
            >
              <Text style={styles.textDisplay}>Chi hộ:</Text>
              <Text style={styles.textContent}>{dataGetById.totalPaidOn}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={changeToAdvanceOnDetailsScreen}
            >
              <Text style={styles.textDisplay}>Total OPS:</Text>
              <Text style={styles.textContent}>{dataGetById.totalOPS}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={changeToFinalSettlementOnDetailsScreen}
            >
              <Text style={styles.textDisplay}>Quyết Toán OPS:</Text>
              <Text style={styles.textContent}>
                {dataGetById.finalSettlementOPS}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              {/* <TouchableOpacity onPress={console.log("z")}> */}
              <Text style={styles.textDisplay}>Lợi nhuận:</Text>
              <Text style={styles.textContent}>{dataGetById.profit}</Text>
              {/* </TouchableOpacity> */}
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Lợi nhuận: </Text>
              <Text style={styles.textContent}>{dataGetById.report.totalBuyVAT}</Text>
            </View> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Total Sell VAT: </Text>
              <Text style={styles.textContent}>
                {dataGetById.approximatelySellToVnd}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Total Buy VAT: </Text>
              <Text style={styles.textContent}>{dataGetById.totalBuyVAT}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Lợi nhuận VAT: </Text>
              <Text style={styles.textContent}>{dataGetById.profitVAT}</Text>
            </View>

            {dataGetById.report.exchangeRate !== 0 ? (
              <View>
                <Text style={styles.textDisplay}>Tỉ giá:</Text>
                <Text style={styles.textContent}>
                  {dataGetById.report.exchangeRate}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={changeToExchangeRateScreen}
              >
                <Text style={styles.textDisplay}>Tỉ giá:</Text>
                <Text style={styles.textContent}>
                  {dataGetById.report.exchangeRate}
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textDisplay}>Lợi nhuận tính usd: </Text>
              <Text style={styles.textContent}>
                {(
                  dataGetById.profit / dataGetById.report.exchangeRate
                ).toFixed()}{" "}
                USD
              </Text>
            </View>
            {code === "PROFIT_REPORT" ? (
              <>
                <View style={styles.styleButton}>
                  <TouchableOpacity
                    style={[styles.buttonUpdate]}
                    onPress={() => {
                      navigation.navigate("AddSellDetail", {
                        data: data,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: color.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Nhập giá bán
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonUpdate]}
                    onPress={() => {
                      navigation.navigate("AddBuyDetail", {
                        data: data,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: color.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Nhập giá mua
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.styleButton}>
                  <TouchableOpacity
                    style={[styles.buttonUpdate]}
                    onPress={() => {
                      navigation.navigate("AddPaidOnDetail", {
                        data: data,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: color.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Nhập chi hộ
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonUpdate]}
                    onPress={() => {
                      navigation.navigate("AddAdvance", {
                        data: data,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: color.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Nhập tạm ứng OPS
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.styleButton}>
                  <TouchableOpacity
                    style={[styles.buttonUpdate]}
                    onPress={() => {
                      navigation.navigate("AddFinalSettlement", {
                        data: data,
                        ops: dataGetById.totalOPS,
                        paid: dataGetById.totalPaidOn,
                        buy: dataGetById.totalBuy,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: color.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Nhập quyết toán
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ProfitReport;

const styles = StyleSheet.create({
  detail: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.primary,
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  textContent: {
    fontSize: 20,
    lineHeight: 25,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInsert: {
    height: 45,
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginVertical: 30,
    alignContent: "center",
  },
  buttonDetail: {
    height: 45,
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginVertical: 10,
    marginLeft: 30,
    alignContent: "center",
  },
  buttonUpdate: {
    marginTop: 20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    marginBottom: 30,
    color: color.primary,
    marginRight: 10,
  },
  buttonBooking: {
    marginTop: 20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    marginBottom: 30,
    color: color.primary,
    marginLeft: 5,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textDisplayCode: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "center",
    color: color.primary,
    fontWeight: "bold",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  textUpdate: {
    fontSize: 19,
    color: color.primary,
    fontWeight: "bold",
  },
});
