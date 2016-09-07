import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import Footer from "./Footer"
import {Actions} from "react-native-router-flux";
import URL from './../urls';
import utility from './../utilities';
import Strings from './../strings';
import Dimensions from 'Dimensions';

var ImageProgress = require('react-native-image-progress');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

var ProfilePage = React.createClass({
  getInitialState() {
    return {
      userName: 'Arjun Venugopal',
      userProfileImg: 'http://vignette2.wikia.nocookie.net/jamesbond/images/8/81/James_Bond_(Daniel_Craig)_-_Profile.jpg/revision/20150405210952',
      numLikedItems: 34,
      numWishlisted: 12,
      numFollowing: 40
    }
  },

  async clearLoginDetails() {
    try {
      await AsyncStorage.removeItem("login_details"); 
      Actions.otploginpage();    
    }
    catch (error) {
      //utility.showAlertWithOK(Strings.ERROR_STORING_AUTH_TOKEN, error.message);    
      utility.showAlertWithOK(Strings.ERROR_STORING_AUTH_TOKEN, Strings.ERROR_STORING_AUTH_TOKEN_MSG);  
    }
  },

  logoutFromApp() {
    this.clearLoginDetails();
  },

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Storefront</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>          
          <View style={styles.userProfileContainer}>
            <View style={styles.userDetailsContainer}>
              <ImageProgress style={styles.userAvatar} source={{uri: this.state.userProfileImg}}/>
              <Text style={styles.userName}>{this.state.userName}</Text>
            </View>
             
            <View style={styles.statsContainer}>  
              <View style={styles.statContainer}>
                <Text style={styles.statValue}>{Dimensions.get('window').width}</Text>
                <Text style={styles.statLabel}>liked</Text>
              </View>

              <View style={styles.statContainer}>
                <Text style={styles.statValue}>{this.state.numWishlisted}</Text>
                <Text style={styles.statLabel}>wishlisted</Text>
              </View>

              <View style={styles.statContainer}>
                <Text style={styles.statValue}>{this.state.numFollowing}</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>
        
          <TouchableOpacity style={styles.profileActions}>
            <MaterialIcons name='person-add' size={16} color='black' /><Text style={styles.actionLabel}>     Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileActions} onPress={()=>this.logoutFromApp()}>
            <MaterialIcons name='exit-to-app' size={16} color='black' /><Text style={styles.actionLabel}>      Log Out</Text>
          </TouchableOpacity>
        </ScrollView>

        
        <Footer page='profile' phone={this.props.phone} authentication_token={this.props.authentication_token}/>

      </View>
    );
  }
});

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
  userProfileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 79, 79, 0.1)',
    paddingBottom: 8
  },
  userAvatar: {
    height: 88,
    borderRadius: 44,
    width: 88,
    marginTop:10,
    marginBottom:10
  },
  userName: {  
    fontFamily: 'HelveticaNeueMedium',
    color: 'black'
  },
  statsContainer: {
    flex:1, 
    flexDirection:'row', 
    alignItems:'stretch', 
    marginTop:22
  },
  scrollContainer: {
    flex: 1
  },
  userDetailsContainer: {
    marginLeft: 8, 
    marginRight: 8, 
    marginBottom: 8, 
    alignItems:'center'
  },
  statContainer: {
    flex:1, 
    alignItems:'center', 
    margin: 4
  },
  statValue: {
    fontSize: 20, 
    fontFamily: 'HelveticaNeueMedium', 
    color: 'black'
  },
  statLabel: {
    fontSize: 10
  },
  profileActions: {
    margin: 16, 
    alignSelf: 'stretch', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  actionLabel: {
    color:'black', 
    fontSize: 16, 
    fontFamily:'HelveticaNeueMedium'
  }
});

module.exports = ProfilePage;