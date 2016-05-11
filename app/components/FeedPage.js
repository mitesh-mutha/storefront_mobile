import React, {View, Text, StyleSheet, Navigator} from "react-native"
import Feed from "./Feed"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "transparent",
    }
});

class FeedPage extends React.Component {
    render(){
        console.log(Navigator.NavigationBar.Styles.General.NavBarHeight);
        return (
            <View style={styles.container}>
                <Feed />
            </View>
        );
    }
}

module.exports = FeedPage;