import React, {View, Text, StyleSheet, Navigator, ScrollView} from "react-native"
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
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    }
  },
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appname: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  }
});

class ProfilePage extends React.Component {
  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.appnamecontainer}>
            <Text style={styles.appname}>Storefront</Text>
          </View>
        </View>

        <ScrollView style={{flex:1,height:500}}>

        </ScrollView>

        
        <Footer page='profile'/>

      </View>
    );
  }
}

module.exports = ProfilePage;