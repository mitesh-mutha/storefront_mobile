import React, {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux";

var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,        
    backgroundColor: "white",
  },
  appNameContainer: {
    padding: 8,
    alignSelf: 'center',
    marginTop: 48
  },
  appName: {
    fontSize: 32,
    fontFamily: 'HelveticaNeueMed',
    color: 'rgba(67, 164, 229, 1)'
  },
  OTPVerificationContainer: {
    flex:1,
    margin: 16, 
    marginTop: 24,
    backgroundColor: 'white'
  },
  OTPInstructionsText: {
    flex:1, 
    color:'black',
    fontFamily: 'HelveticaNeueMed', 
    alignSelf:'center'
  },
  OTPMobileNumText: {
    flex:1, 
    color:'black',
    fontFamily: 'HelveticaNeueMed', 
    alignSelf:'center', 
    fontSize:20
  },
  OTPInput: {
    flex:1, 
    height: 40, 
    marginTop:16
  },
  signInButton: {
    flex:1, 
    backgroundColor:'rgba(67, 164, 229, 1)', 
    alignItems:'center', 
    margin:6, 
    marginTop:16
  },
  signInButtonLabel: {
    flex:1, 
    color:'white', 
    fontFamily:'HelveticaNeueMed', 
    margin:8
  },
  OTPOptionButton: {
    flex:1, 
    color:'rgba(67, 164, 229, 1)', 
    alignSelf:'center', 
    textDecorationLine: 'underline', 
    textDecorationStyle: 'solid'
  }
});

var OTPVerificationPage = React.createClass({
  render(){
    return (
      <ScrollView style={styles.scrollContainer}>

        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>Storefront</Text>
        </View>

        <View style={styles.OTPVerificationContainer}>
          
          <Text style={styles.OTPInstructionsText}>OTP sent to</Text>
          
          <Text style={styles.OTPMobileNumText} onPress={()=>Actions.otploginpage()}>+91 9741907663</Text>
          
          <TextInput
            placeholder="OTP"
            keyboardType="numeric"
            underlineColorAndroid='rgba(67, 164, 229, 1)'
            style={styles.OTPInput}/>
          
          <TouchableOpacity style={styles.signInButton} 
            onPress={()=>Actions.feedpage()}>
            <Text style={styles.signInButtonLabel}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.OTPOptionButton}>Resend OTP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>Actions.otploginpage()}>
            <Text style={styles.OTPOptionButton}>Different number?</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    )
  }
});

module.exports = OTPVerificationPage