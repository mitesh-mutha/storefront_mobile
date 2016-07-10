import React, {View, Text, StyleSheet, Navigator} from "react-native"
import Feed from "./Feed"
import Footer from "./Footer"

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    backgroundColor: "white",
  },
  header: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  appNameContainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appName: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  }
});

class FeedPage extends React.Component {
  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Storefront</Text>
          </View>
        </View>

        <Feed />
        
        <Footer page='home'/>

      </View>
    );
  }
}

module.exports = FeedPage;