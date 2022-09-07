import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import React from "react";
import color from "./../contains/color";
import FormDropdownContinent from "../components/FormDropdownContinent";
import FormDropDownMonth from "../components/FormDropDownMonth";


const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 4, justifyContent: 'space-between', marginBottom: 50, flexDirection: 'row' }}>
                <FormDropDownMonth label='Chọn Tháng' />
                <FormDropdownContinent label='Chọn Châu' />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Add");
                    }}
                >
                    <View style={styles.iconWrapper}>
                        <Text style={styles.icon}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        position:'absolute',
        right:10,
        marginBottom:0,
    },
    icon: {
        fontSize: 24,
        color: color.white,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
