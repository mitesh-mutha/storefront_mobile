import React, {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  scrollcontainer: {
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
  OTPLoginContainer: {
    flex:1,
    margin: 16, 
    marginTop: 24,
    backgroundColor: 'white'
  },
  loginHeading: {
    flex:1, 
    color:'black',
    fontFamily: 'HelveticaNeueMed', 
    alignSelf:'center'
  },
  mobileNumInput: {
    flex:1, 
    height: 40, 
    marginTop:16
  },
  loginButton: {
    flex:1, 
    backgroundColor:'rgba(67, 164, 229, 1)', 
    alignItems:'center', 
    margin:6, 
    marginTop:16
  },
  loginButtonLabel: {
    flex:1, 
    color:'white', 
    fontFamily:'HelveticaNeueMed', 
    margin:8
  }
});

var OTPLoginPage = React.createClass({
  render(){
    return (
      <ScrollView style={styles.scrollcontainer}>

        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>Storefront</Text>
        </View>

        <View style={styles.OTPLoginContainer}>
          <Text style={styles.loginHeading}>Login</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="numeric"
            underlineColorAndroid='rgba(67, 164, 229, 1)'
            style={style.mobileNumInput}/>
          <TouchableOpacity style={styles.loginButton} 
            onPress={()=>Actions.otpverificationpage()}>
            <Text style={style.loginButtonLabel}>Send OTP</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }
});

module.exports = OTPLoginPage