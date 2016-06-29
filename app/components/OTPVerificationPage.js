import React, {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux";

var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    backgroundColor: "white",
  },
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center',
    marginTop: 48
  },
  appname: {
    fontSize: 32,
    fontFamily: 'HelveticaNeueMed',
    color: 'rgba(67, 164, 229, 1)'
  }
});

var OTPVerificationPage = React.createClass({
  render(){
    return (
      <ScrollView style={{backgroundColor:'white'}}>

        <View style={styles.appnamecontainer}>
          <Text style={styles.appname}>Storefront</Text>
        </View>

        <View style={{
              flex:1,
              margin: 16, 
              marginTop: 24,
              backgroundColor: 'white'
            }}>
          <Text style={{flex:1, color:'black',fontFamily: 'HelveticaNeueMed', alignSelf:'center'}}>OTP sent to</Text>
          <Text style={{flex:1, color:'black',fontFamily: 'HelveticaNeueMed', alignSelf:'center', fontSize:20}} onPress={()=>Actions.otploginpage()}>+91 9741907663</Text>
          <TextInput
            placeholder="OTP"
            keyboardType="numeric"
            underlineColorAndroid='rgba(67, 164, 229, 1)'
            style={{flex:1, height: 40, marginTop:16}}/>
          <TouchableOpacity style={{flex:1, backgroundColor:'rgba(67, 164, 229, 1)', alignItems:'center', margin:6, marginTop:16}} 
            onPress={()=>Actions.feedpage()}>
            <Text style={{flex:1, color:'white', fontFamily:'HelveticaNeueMed', margin:8}}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{flex:1, color:'rgba(67, 164, 229, 1)', alignSelf:'center', textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>Resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Actions.otploginpage()}>
            <Text style={{flex:1, color:'rgba(67, 164, 229, 1)', alignSelf:'center', textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>Different number?</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }
});

module.exports = OTPVerificationPage