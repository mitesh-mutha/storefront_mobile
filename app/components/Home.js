import React, {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});

class Home extends React.Component {
    render(){
        return (
            <View {...this.props}  style={styles.container}>
                <Text>Home page</Text>
            </View>
        );
    }
}

module.exports = Home;