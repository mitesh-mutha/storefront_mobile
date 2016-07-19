import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {Actions} from "react-native-router-flux";
import Communications from 'react-native-communications';

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
  appNameContainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appName: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  carous: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  scrollContainer: {
    flex: 1
  },
  sellerNameContainer: {
    flex:1, 
    alignItems:'center', 
    borderStyle:'solid', 
    borderBottomColor:'rgba(79, 79, 79, 0.1)', 
    borderBottomWidth:1
  },
  sellerNameText: {
    flex:1, 
    color:'black', 
    margin:16
  },
  vendorActionsContainer: {
    flex:1, 
    flexDirection:'row', 
    alignItems:'center', 
    borderStyle:'solid', 
    borderBottomColor:'rgba(79, 79, 79, 0.1)', 
    borderBottomWidth:1
  },
  callActionButton: {
    flex:1, 
    alignItems:'center', 
    padding: 8, 
    borderStyle:'solid', 
    borderRightColor:'rgba(79, 79, 79, 0.1)', 
    borderRightWidth:1
  },
  callActionLabel: {
    marginTop:8, 
    fontFamily:'HelveticaNeueMed', 
    color:'black'
  },
  mapActionButton: {
    flex:1, 
    alignItems:'center', 
    padding: 8
  },
  mapActionLabel: {
    marginTop:8, 
    fontFamily:'HelveticaNeueMed', 
    color:'black'
  },
  catalogButton: {
    flex:1, 
    alignItems:'center', 
    borderStyle:'solid', 
    borderBottomColor:'rgba(79, 79, 79, 0.1)', 
    borderBottomWidth:1
  },
  catalogLabel: {
    flex:1, 
    color:'black', 
    margin:16, 
    fontFamily:'HelveticaNeueMed'
  }
});

var VendorPage = React.createClass({
  getInitialState() {
    return {
      lat: "12.9404395",
      long: "77.5817127",
      vendorname: "Arnav Jewellery"
    }
  },

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.appNameContainer} onPress={()=>Actions.pop()}>
            <MaterialIcons name="arrow-back" size={24} color={'black'} />
          </TouchableOpacity>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Storefront</Text>
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

        <ScrollView style={styles.scrollContainer}>

          <View style={styles.sellerNameContainer}>
            <Text style={styles.sellerNameText}>Arnav Jewellery</Text>
          </View>

          <View style={styles.vendorActionsContainer}>
            
            <TouchableOpacity style={styles.callActionButton} onPress={() => Communications.phonecall('0123456789', true)}>
              <MaterialIcons name="call" size={24} color='black' />
              <Text style={styles.callActionLabel}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mapActionButton} onPress={() => Linking.openURL("geo:"+this.state.lat+","+this.state.long+"?q="+this.state.lat+","+this.state.long+"("+this.state.vendorname+")").catch(err => console.error('An error occurred', err)) }>
              <MaterialIcons name="place" size={24} color='black' />
              <Text style={styles.mapActionLabel}>Map</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.catalogButton}>
            <Text style={styles.catalogLabel}><MaterialIcons name="chrome-reader-mode" size={24} color='black' />    Catalog</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
});

module.exports = VendorPage;