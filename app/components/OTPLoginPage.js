import React, {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux";

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
    alignSelf: 'center',
    marginTop: 48
  },
  appname: {
    fontSize: 32,
    fontFamily: 'HelveticaNeueMed',
    color: 'rgba(67, 164, 229, 1)'
  }
});

var OTPLoginPage = React.createClass({
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
          <Text style={{flex:1, color:'black',fontFamily: 'HelveticaNeueMed', alignSelf:'center'}}>Login</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="numeric"
            underlineColorAndroid='rgba(67, 164, 229, 1)'
            style={{flex:1, height: 40, marginTop:16}}/>
          <TouchableOpacity style={{flex:1, backgroundColor:'rgba(67, 164, 229, 1)', alignItems:'center', margin:6, marginTop:16}} 
            onPress={()=>Actions.otpverificationpage()}>
            <Text style={{flex:1, color:'white', fontFamily:'HelveticaNeueMed', margin:8}}>Send OTP</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }
});

module.exports = OTPLoginPage