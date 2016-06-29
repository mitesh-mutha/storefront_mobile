import React, {View, Text, StyleSheet, Navigator, ScrollView, TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux";

var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Carousel = require('react-native-carousel');

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
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appname: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  carous: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});

var VendorPage = React.createClass({
  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.appnamecontainer} onPress={()=>Actions.pop()}>
            <MaterialIcons name="arrow-back" size={24} color={'black'} />
          </TouchableOpacity>
          <View style={styles.appnamecontainer}>
            <Text style={styles.appname}>Storefront</Text>
          </View>
        </View>

        <Carousel 
          animate={true} 
          delay={2000} 
          loop={true} 
          indicatorAtBottom={true} 
          indicatorOffset={0} 
          indicatorColor="#FFFFFF"
          indicatorSize={30}
          indicatorSpace={15} >
            <View style={styles.carous}>
              <Text>Page 1</Text>
            </View>
            <View style={styles.carous}>
              <Text>Page 2</Text>
            </View>
            <View style={styles.carous}>
              <Text>Page 3</Text>
            </View>
        </Carousel>

        <ScrollView style={{flex:1}}>

          <View style={{flex:1, alignItems:'center', borderStyle:'solid', borderBottomColor:'rgba(79, 79, 79, 0.1)', borderBottomWidth:1}}>
            <Text style={{flex:1, color:'black', margin:16}}>Arnav Jewellery</Text>
          </View>

          <View style={{flex:1, flexDirection:'row', alignItems:'center', borderStyle:'solid', borderBottomColor:'rgba(79, 79, 79, 0.1)', borderBottomWidth:1}}>
            
            <View style={{flex:1, alignItems:'center', padding: 8, borderStyle:'solid', borderRightColor:'rgba(79, 79, 79, 0.1)', borderRightWidth:1}}>
              <MaterialIcons name="call" size={24} color='black' />
              <Text style={{marginTop:8, fontFamily:'HelveticaNeueMed', color:'black'}}>Call</Text>
            </View>
            
            <View style={{flex:1, alignItems:'center', padding: 8}}>
              <MaterialIcons name="place" size={24} color='black' />
              <Text style={{marginTop:8, fontFamily:'HelveticaNeueMed', color:'black'}}>Map</Text>
            </View>

          </View>

          <View style={{flex:1, alignItems:'center', borderStyle:'solid', borderBottomColor:'rgba(79, 79, 79, 0.1)', borderBottomWidth:1}}>
            <Text style={{flex:1, color:'black', margin:16, fontFamily:'HelveticaNeueMed'}}><MaterialIcons name="chrome-reader-mode" size={24} color='black' />    Catalog</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
});

module.exports = VendorPage;