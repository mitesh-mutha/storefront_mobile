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
  scrollContainer: {
    flex: 1
  },
  carous: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  sellerNameContainer: {
    margin: 8,
    alignItems:'center'
  },
  sellerNameText: {
    color:'black',
    fontSize: 24
  },
  detailsContainer: {
    flex: 1,
    marginTop: 24,
    marginRight: 16,
    marginLeft: 16
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    margin: 8,
  },
  sectionHeadingContainer: {
    flex: 1,
    margin: 2
  },
  sectionTextContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2
  },
  actionIconContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8
  },
  actionDetailsContainer: {
    flex: 1
  },
  sectionHeadingText: {
    color: 'black',
    fontFamily: 'HelveticaNeueMed',
    fontSize: 12
  },
  sectionText: {
    fontSize: 12
  },
  catalogButton: {
    margin: 16,
    backgroundColor: 'rgba(67, 164, 229, 1)',
    alignItems: 'center'
  },
  catalogLabel: {
    flex:1, 
    color:'white', 
    fontFamily:'HelveticaNeueMed', 
    margin:8
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
            <Text style={styles.sellerNameText}>{this.state.vendorname}</Text>
          </View>

          <View style={styles.detailsContainer}>

            <View style={styles.sectionContainer}>

              <View style={styles.actionDetailsContainer}>
                <View style={styles.sectionHeadingContainer}>
                  <Text style={styles.sectionHeadingText}>Address</Text>
                </View>

                <View style={styles.sectionTextContainer}>
                  <Text style={styles.sectionText}>Jayanagar, Bangalore, Karnataka - 560030</Text>
                </View>
              </View>
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="place" size={24} color='rgba(67, 164, 229, 1)' />
              </View>

            </View>

            <View style={styles.sectionContainer}>

              <View style={styles.actionDetailsContainer}>
                <View style={styles.sectionHeadingContainer}>
                  <Text style={styles.sectionHeadingText}>Contact Number</Text>
                </View>

                <View style={styles.sectionTextContainer}>
                  <Text style={styles.sectionText}>99829842934</Text>
                </View>
              </View>
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="call" size={24} color='rgba(67, 164, 229, 1)' />
              </View>

            </View>               

          </View>

          <TouchableOpacity style={styles.catalogButton}>
              <Text style={styles.catalogLabel}>Catalog</Text>
          </TouchableOpacity>       

        </ScrollView>

      </View>
    )
  }
});

module.exports = VendorPage;