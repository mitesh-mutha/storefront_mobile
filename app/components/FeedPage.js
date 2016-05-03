import React, {View, Text, StyleSheet, Navigator} from "react-native";
import {Actions} from "react-native-router-flux";
import Feed from "./Feed"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "transparent",
    }
});

class FeedPage extends React.Component {
    render(){
        return (
            <View {...this.props}  style={styles.container}>
                <Feed />
            </View>
        );
    }
}

module.exports = FeedPage;