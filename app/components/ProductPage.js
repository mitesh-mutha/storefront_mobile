import React, {View, Text, StyleSheet, Navigator} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "transparent",
    }
});

class ProductPage extends React.Component {
    render(){
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

module.exports = ProductPage;